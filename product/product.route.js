const { Router } = require('express');
const ProductController = require("./product.controller");
const validator = require('../middlware/validator');
const productValidator = require("../validation/product")
const validateAccessToken = require("../config/verifyToken")

const router = Router();
router.post("/create/product", validateAccessToken, ProductController.CreateProduct);
//router.post("/create/product", validateAccessToken, validator(productValidator),ProductController.CreateProduct);
router.put("/product/update", ProductController.UpdateProduct);
router.delete("/product/delete", ProductController.DeleteProduct);
router.get("/product/get", ProductController.GetProduct);
router.post("/product/upload", ProductController.UploadCourses);
router.post("/product/:id", ProductController.ReviewProduct);

module.exports = router;