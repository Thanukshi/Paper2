const routes = require("express").Router();
const categoryRoutes = require("../../controller/category.conteroller");

routes.post("/add-category", categoryRoutes.addCategories);
routes.get("/get-category", categoryRoutes.getAllCategories);
routes.get("/get-vehicle/:id", categoryRoutes.getVehicleByCategoryId);

module.exports = routes;
