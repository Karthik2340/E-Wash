const express = require("express");
const router = express.Router();
const Address = require("../models/Address"); // Address model
const ServiceCenter = require("../models/ServiceCenters"); // ServiceCenter model
const authenticateUser = require("../middleware/authMiddleware"); // Auth middleware

// Save User Address
router.post("/save", authenticateUser, async (req, res) => {
  try {
    const { address, city, state, pincode } = req.body;
    const userId = req.user.id; // Get user ID from JWT token

    // Save the address in MongoDB
    await Address.findOneAndUpdate(
      { userId },
      { address, city, state, pincode, userId },
      { upsert: true, new: true }
    );

    res.json({ success: true, message: "Address saved successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
});

// Get Nearby Service Centers
router.get("/service-centers", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const userAddress = await Address.findOne({ userId });

    if (!userAddress) {
      return res.status(404).json({ message: "Address not found" });
    }

    const centers = await ServiceCenter.find({ city: userAddress.city });
    res.json({ success: true, centers });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
});

module.exports = router;
