const { Router } = require('express');
const ProfileController = require("./profile.controller");
const validator = require('../middlware/validator');
const profileValidator = require("../validation/profile")
const validateAccessToken = require("../config/verifyToken")


const router = Router();
router.post("/create/profile", validateAccessToken, validator(profileValidator), ProfileController.CreateProfile);
router.put("/edit/profile", validateAccessToken,  ProfileController.EditProfile);
router.get("/get/profile", validateAccessToken, ProfileController.GetProfile);
router.post("/upload/profile", ProfileController.UploadprofileImage);


module.exports = router;