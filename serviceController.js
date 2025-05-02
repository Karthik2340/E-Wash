const Service = require('../models/Service');

// Get all services
const getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new service
const addService = async (req, res) => {
    try {
        const { name, location, address, pricing } = req.body;
        const service = new Service({ name, location, address, pricing });
        await service.save();
        res.status(201).json({ message: "Service added successfully!" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getAllServices, addService };
//serviceController.js