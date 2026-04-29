const { Router } = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();

indexRouter.get("/", indexController.indexGet);
indexRouter.post("/", indexController.indexPost);
indexRouter.get("/update", indexController.updateGet);
indexRouter.post("/addGame", indexController.addGamePost);
indexRouter.post("/removeGame", indexController.removeGamePost);
indexRouter.post("/addDev", indexController.addDevPost);
indexRouter.post("/removeDev", indexController.removeDevPost);
indexRouter.post("/addGenre", indexController.addGenrePost);
indexRouter.post("/removeGenre", indexController.removeGenrePost);
indexRouter.post("/addPrice", indexController.addPricePost);
indexRouter.post("/removePrice", indexController.removePricePost);


module.exports = indexRouter;
