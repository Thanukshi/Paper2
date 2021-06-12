const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    vehicles: [{
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "vehicle",
    }],
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("category", CategorySchema);
module.exports = Category;
