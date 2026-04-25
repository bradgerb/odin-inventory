const { Router } = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();

indexRouter.get("/", indexController.indexGet);
indexRouter.post("/", indexController.indexPost);
indexRouter.get("/games", indexController.gamesGet);
indexRouter.get("/devs", indexController.devsGet);
indexRouter.post("/addDev", indexController.addDevsPost);
indexRouter.get("/genres", indexController.genresGet);
indexRouter.get("/prices", indexController.pricesGet);
indexRouter.get("/stock", indexController.stockGet);

module.exports = indexRouter;
