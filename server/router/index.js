const routes = require("express").Router();
const VehicleRoute = require("./Vehicle");
const CategoryRoute = require("./Category");

routes.use("/vehicle", VehicleRoute);
routes.use("/category", CategoryRoute);

module.exports = routes;
