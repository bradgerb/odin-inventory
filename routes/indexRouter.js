const { Router } = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();

indexRouter.get("/", indexController.indexGet);
indexRouter.post("/", indexController.indexPost);
indexRouter.get("/games", indexController.indexGamesGet);
indexRouter.get("/devs", indexController.indexDevsGet);
indexRouter.get("/genres", indexController.indexGenresGet);
indexRouter.get("/prices", indexController.indexPricesGet);
indexRouter.get("/stock", indexController.indexStockGet);

module.exports = indexRouter;
