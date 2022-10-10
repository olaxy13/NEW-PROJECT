const _ = require("underscore");
// const { authSchema, loginSchema } = require("../helper/validation")
const User = require("../auth/auth.model");
const Product = require("./product.model");

const vm = require("v-response");
const { _ids } = require("@hapi/joi/lib/base");

/**
 * @controller User authentication controller
 * */
/**
 * @param
 * */

//CREATE ACCOUNT
exports.CreateProduct = async (req, res, next) => {
    try {
        const create_product = new Product(req.body);
        const save_product = await create_product.save()
        if (!save_product) {
            return res.status(404).json({ product_error: "No products created contact the admin for support" })
        }
        else {
    
            return res.status(200).json(save_product)
        }
    } catch (error) {
        if (error.isJoi === true) {
            return res.status(400)
                .json({
                    status: false,
                    code: 400,
                    message: "There's error in your inputs",
                })
        }
        return next(error);
    }

}

//CREATE ACCOUNT
exports.UpdateProduct = async (req, res, next) => {
    try {
        const updated_product = await Product.findOne({id: req.body.id});
        console.log(updated_product, "dfghj")
        Object.assign(updated_product, req.body);
        updated_product.save((err, savedProduct) => {
            if (err) {
              console.log("saved-err:", err);
              return next();
            }
            return res.status(200).json({ status: "true", msg: "You have successfuly updated your product", savedProduct })
          });
    } catch (error) {
        if (error.isJoi === true) {
            return res.status(400)
                .json({
                    status: false,
                    code: 400,
                    message: "There's error in your inputs",
                })
        }
        return next(error);
    }

}

exports.DeleteProduct = async (req, res, next) => {
    try {
        const find_product = await Product.findOne({id: req.body.id});
        if(find_product) {
            await Product.findByIdAndDelete(find_product)
            return res.status(200).json({ status: true, msg:"You have Succesfully deleted Product"})
        }
        return res.status(404).json({ status: false, msg:"Product does not Exist"})
    } catch (error) {
        if (error.isJoi === true) {
            return res.status(400)
                .json({
                    status: false,
                    code: 400,
                    message: "There's error in your inputs",
                })
        }
        return next(error);
    }
}


exports.GetProduct = async (req, res, next) => {
    const qCategory = req.query.category;
    try {
        let products;
      if(qCategory) {
        products = await Product.find({
            category: {
                $in: [qCategory],
            }
        });
      }
      else {
        products = await Product.find()
      }
      return res.status(200).json(products)
    } catch (error) {
        if (error) {
            return res.status(400)
                .json({
                    status: false,
                    code: 400,
                    message: "There's error in your inputs",
                })
        }
        return next(error);
    }
}