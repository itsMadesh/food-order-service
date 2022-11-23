const express = require("express");
const router = express.Router();
const StoreManagerController = require("../controllers/StoreManagerController")
const StoreManagerMiddleware = require("../middlewares/StoreManagerMiddleware")

router.post("/signin", StoreManagerMiddleware.isValidStore, StoreManagerController.signin);

router.get("/info", StoreManagerController.getInfo);

router.get("/item/:itemId", StoreManagerController.getItem)

router.post("/item", StoreManagerController.addItem);

router.delete("/item/:itemId", StoreManagerController.removeItem);

router.put("/item/:itemId", StoreManagerController.updateItem);

router.get("/orders", StoreManagerMiddleware.isUserLoggedIn, StoreManagerController.getOrders);

router.put("/order/:id", StoreManagerMiddleware.isUserLoggedIn, StoreManagerController.updateStatus)


module.exports = router;