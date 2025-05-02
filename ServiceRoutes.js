const express = require("express");
const router = express.Router();

const services = [
  { id: 1, name: "Car Wash", price: 500 },
  { id: 2, name: "Bike Wash", price: 250 },
  { id: 3, name: "Car Maintenance", price: 1500 },
  { id: 4, name: "Bike Maintenance", price: 800 },
];

router.get("/", (req, res) => {
  res.json(services);
});

module.exports = router;
