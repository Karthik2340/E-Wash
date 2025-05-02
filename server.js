require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

const ServiceCenter = require("./models/ServiceCenter");

// Check for required environment variables
if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  console.error("❌ Missing required environment variables");
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("✅ MongoDB connected");

    // Insert default service centers if they don't exist
    const existingCenters = await ServiceCenter.countDocuments();
    if (existingCenters === 0) {
      await ServiceCenter.insertMany([
        { name: "Eco Clean Auto Spa", address: "123 Greenway St", city: "New Delhi", distance: 5, rating: 4.5, availability: "Available" },
        { name: "Waterless Wash Hub", address: "456 Eco Road", city: "Mumbai", distance: 8, rating: 4.7, availability: "Available" },
        { name: "Nature Touch Car Wash", address: "789 Blue St", city: "Bangalore", distance: 6, rating: 4.6, availability: "Available" }
      ]);
      console.log("✅ Default service centers added.");
    }
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// **Schemas**
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  password: String,
});
const User = mongoose.model("User", UserSchema);

const AddressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  address: String,
  city: String,
  state: String,
  pincode: String,
});
const Address = mongoose.model("Address", AddressSchema);

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  serviceCenterId: { type: mongoose.Schema.Types.ObjectId, ref: "ServiceCenter" },
  serviceType: String,
  date: String,
  timeSlot: String,
  status: { type: String, default: "Confirmed" },
});
const Booking = mongoose.model("Booking", BookingSchema);

// **Middleware to Verify Token**
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Access denied, token missing" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

// **User Signup**
app.post("/api/signup", async (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, phone, password: hashedPassword });
    await newUser.save();

    console.log("✅ User stored:", newUser); // Debug log

    res.json({ message: "Signup successful!" });
  } catch (error) {
    console.error("❌ Error storing user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


// **User Login**
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email and password are required" });

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Login successful!", token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// **Save Address**
app.post("/api/address", verifyToken, async (req, res) => {
  const { address, city, state, pincode } = req.body;
  if (!address || !city || !state || !pincode) return res.status(400).json({ message: "All address fields are required" });

  try {
    await Address.findOneAndUpdate({ userId: req.user.id }, { address, city, state, pincode }, { upsert: true });
    res.json({ success: true, message: "Address saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving address", error: error.message });
  }
});

// **Fetch Service Centers**
app.get("/api/service-centers", async (req, res) => {
  try {
    const serviceCenters = await ServiceCenter.find();
    res.json(serviceCenters);
  } catch (error) {
    res.status(500).json({ message: "Error fetching service centers", error: error.message });
  }
});

// **Confirm Booking**
app.post("/api/bookings", verifyToken, async (req, res) => {
  const { serviceCenterId, serviceType, date, timeSlot } = req.body;
  if (!serviceCenterId || !serviceType || !date || !timeSlot) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const booking = await new Booking({ userId: req.user.id, serviceCenterId, serviceType, date, timeSlot }).save();
    res.json({ success: true, message: "Booking confirmed!", booking });
  } catch (error) {
    res.status(500).json({ message: "Error saving booking", error: error.message });
  }
});

// **Fetch User Details**
app.get("/api/user/details", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name email phone");
    if (!user) return res.status(404).json({ message: "User not found" });

    const address = await Address.findOne({ userId: req.user.id });

    res.json({
      name: user.name,
      phone: user.phone,
      address: address ? address.address : "Not Provided",
      city: address ? address.city : "Not Provided",
      state: address ? address.state : "Not Provided",
      pincode: address ? address.pincode : "Not Provided",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// **Fetch User Bookings**
app.get("/api/bookings", verifyToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).populate("serviceCenterId", "name address");
    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error: error.message });
  }
});

// **Check if User Has Address**
app.get("/api/address/check", verifyToken, async (req, res) => {
  try {
    const userAddress = await Address.findOne({ userId: req.user.id });
    res.json({ hasAddress: !!userAddress });
  } catch (error) {
    res.status(500).json({ message: "❌ Server error" });
  }
});

// **Start Server**
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
