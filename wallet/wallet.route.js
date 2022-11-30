const { Router } = require('express');
const WalletController = require("./wallet.controller");
//const validator = require('../middlware/validator');
//const validateAccessToken = require("../config/verifyToken")

const router = Router();
//router.post("/paystack/payment",  WalletController.fund);
router.post("/paystack/pay",  WalletController.fundAccount);
router.get("/paystack/callback",  WalletController.Verify);


module.exports = router;