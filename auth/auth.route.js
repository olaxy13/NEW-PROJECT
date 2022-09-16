const { Router } = require('express');
const UserController = require("./auth.controller");

const router = Router();
router.post("/create/account", UserController.CreateAccount);
router.post("/account/login", UserController.login);

module.exports = router;