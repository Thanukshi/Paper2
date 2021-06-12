const Category = require("../model/Category.model");

const CategoryFunctions = {
  addCategories: async (req, res) => {
    try {
      const { code, type, vehicles } = req.body;

      if (!code || !type || !vehicles) {
        return res.status(400).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: "Content can not be empty.",
        });
      }

      const codeCheck = await Category.findOne({ code });
      //const typeCheck = await Category.findOne({ type });

      if (codeCheck) {
        return res.status(400).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: "Code is already exist.",
        });
      }

      //   if (typeCheck) {
      //     return res.status(400).json({
      //       code: 400,
      //       success: false,
      //       status: "Bad Request",
      //       message: "Type is already exist.",
      //     });
      //   }

      const newCategory = new Category({
        code,
        type,
        vehicles,
      });

      await newCategory.save();

      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        data: newCategory,
        message: "Category is added successfully.",
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
  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.find({});
      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        data: categories,
        message: "Category details recieved.",
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
        const catId = await Category.findById(req.params.id);
        const vehiclesDetails = await Category.findOne(catId).populate(
          "vehicles",
          "code model type name"
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

module.exports = CategoryFunctions;
