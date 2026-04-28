const { Router } = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();

indexRouter.get("/", indexController.indexGet);
indexRouter.post("/", indexController.indexPost);
indexRouter.get("/update", indexController.updateGet);
indexRouter.post("/addDev", indexController.addDevsPost);

module.exports = indexRouter;
