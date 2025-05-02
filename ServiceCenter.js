const mongoose = require("mongoose");

const ServiceCenterSchema = new mongoose.Schema(
  {
    name: String,
    address: String,
    city: String,
    distance: Number,
    rating: Number, // Ensure this is stored as a Number
    availability: String, // "Available" or "Full"
  },
  { collection: "serviceCenters" } // Explicitly set collection name
);

module.exports = mongoose.model("ServiceCenter", ServiceCenterSchema);
