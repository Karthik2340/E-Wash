const express = require("express");
const router = express.Router();
const ServiceCenter = require("../models/ServiceCenter"); // MongoDB model

router.get("/", async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) return res.status(400).json({ message: "City is required" });

    const serviceCenters = await ServiceCenter.find({ city });
    res.json(serviceCenters);
  } catch (error) {
    res.status(500).json({ message: "Error fetching service centers" });
  }
});

module.exports = router;
