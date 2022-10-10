const { Router } = require('express');
const OrderController = require("./order.controller");
const validator = require('../middlware/validator');
//const registerValidator = require("../validation/register")
const validateAccessToken = require("../config/verifyToken")

const router = Router();
router.post("/create/order",  /*validator(productValidator),*/ OrderController.CreateOrder);
router.put("/order/update", OrderController.UpdateOrder);
router.delete("/order/delete", OrderController.DeleteOrder);
router.get("/order/get", OrderController.GetOrder);
router.get("/order/get/admin", OrderController.GetOrderAdmin);
router.get("/order/income", OrderController.GetIncome);


module.exports = router;