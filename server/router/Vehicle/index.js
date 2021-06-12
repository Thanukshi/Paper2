const routes = require("express").Router();
const vehicleRoutes = require("../../controller/vehicle.controller");

routes.post("/add-vehicle", vehicleRoutes.addVehicle);
routes.get("/get-vehicle", vehicleRoutes.getAllVehicle);
routes.get("/get-vehicle/:id", vehicleRoutes.getVehicleByCategoryId);

module.exports = routes;
