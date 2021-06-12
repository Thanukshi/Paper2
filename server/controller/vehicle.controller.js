const Vehicle = require("../model/Vehicle.model");
const Category = require("../model/Category.model");

const VehicleFunctions = {
  addVehicle: async (req, res) => {
    try {
      const { code, model, type, name, categories } = req.body;
      if (!code || !model || !type || !name || !categories) {
        return res.status(400).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: "Content can not be empty.",
        });
      }

      const codeCheck = await Vehicle.findOne({ code });

      if (codeCheck) {
        return res.status(400).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: "Code is already exist.",
        });
      }

      const newVehicle = new Vehicle({
        code,
        model,
        type,
        name,
        categories,
      });

      await newVehicle.save();

      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        data: newVehicle,
        message: "Vehicle is added successfully.",
      });
    } catch (err) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: err.message,
      });
    }
  },
  getAllVehicle: async (req, res) => {
    try {
      const vehicles = await Vehicle.find({}).populate(
        "categories",
        "code type"
      );
      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        data: vehicles,
        message: "Vehicles details recieved.",
      });
    } catch (err) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: err.message,
      });
    }
  },
  getVehicleByCategoryId: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        //const catId = await Category.findById(req.params.id);
        const vehiclesDetails = await Vehicle.findById(req.params.id).populate(
          "vehicles"
        );

        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          data: vehiclesDetails,
          message: "Vehicles details recieved.",
        });
      }
    } catch (err) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: err.message,
      });
    }
  },
};
module.exports = VehicleFunctions;
