const { Router } = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();

indexRouter.get("/", indexController.indexGet);
indexRouter.post("/", indexController.indexPost);
indexRouter.get("/update", indexController.updateGet);
indexRouter.post("/addDev", indexController.addDevPost);
indexRouter.post("/addGenre", indexController.addGenrePost);
indexRouter.post("/addPrice", indexController.addPricePost);
indexRouter.post("/addStock", indexController.addStockPost);

module.exports = indexRouter;
