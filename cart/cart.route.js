const { Router } = require('express');
const CartController = require("./cart.controller");
const validator = require('../middlware/validator');
const validateAccessToken = require("../config/verifyToken")

const router = Router();
router.post("/create/cart",  CartController.CreateCart);



module.exports = router;