const { Router } = require('express');
const UserController = require("./auth.controller");
const validator = require('../middlware/validator');
const loginValidator = require("../validation/login")
const registerValidator = require("../validation/register")
const validateAccessToken = require("../config/verifyToken")

const router = Router();
router.post("/create/account", validator(registerValidator), UserController.CreateAccount);
router.post("/account/login",  validator(loginValidator), UserController.login);


module.exports = router;