const _ = require("underscore");

const multer = require('multer');
const path = require("path")

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // const text = req.body.message;
        // const now = Date.now();
        // fs.writeFile(path.join(__dirname,"./tutorials/"
        //  + file.originalname + "-" + now + ".txt"), text, console.log);
        cb(null, './uploads');
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
     const ext = path.extname(file.originalname).toLocaleLowerCase();
     if( ext !== '.mkv' && ext !== '.mp4') {
         return callback(new Error('Only videos are allowed'))
     }
     callback(null, true)
 },
 // limits:{
 //     fileSize: 1024 * 1024
 // }
 }).array("courses");



// const { authSchema, loginSchema } = require("../helper/validation")
const User = require("../auth/auth.model");
const Product = require("./product.model");

const vm = require("v-response");
const { _ids } = require("@hapi/joi/lib/base");
const { userChecker } = require("../helper/index")
/**
 * @controller User authentication controller
 * */
/**
 * @param
 * */

//CREATE ACCOUNT
exports.CreateProduct = userChecker, async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)
        _.extend(req.body, { user: user._id })
            console.log("yes!!!!",_.extend(req.body, { user: user._id }))

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


        //UPLOAD PROFILE IMAGE
        exports.UploadCourses =  async (req, res, next) => {
            try {
              upload(req, res, (err) => {
                if(err) {
                  console.log(err, "Fff")
                  res.status(400).send("something went wrong")
                }
                res.send(req.file)
              })  
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









 exports.ReviewProduct = async (req, res, next) => {
    const user = await User.findById(req.user._id)
    console.log("OMO>>>>", user)
    Product.findById(req.params.id)
     
       .then((product) => {
        if(product) {
            const newReview = {
        
                text: req.body.text,
                user: req.user.id,
                
              };
              console.log("OOO",product) 
              //add comments to array
              product.review.unshift(newReview);
              //save
      product.save().then(review => {
        return res.status(200).json({
         status:true,
         message:"Review successful",
         data: review
     });
       });

        }
        return res.status(404).json({ event_not_found: "There is no product to reviews" })
        
    })
    .catch(err => {
        res.status(400).json({
            status:false,
            message:"cant create coment",
            error:err,
            
        }, console.log("ERR>>>>>", err)
       )
    });
        
        // try {
            //    const find_product = await Product.findById(req.params.id)
            //    if(find_product) {
            //     const newReview = {
            //         text: req.body.text,
            //     }
            //     _.extend(req.body, {
            //        user : req.user.id
            //     })
               
            //  find_product.review.unshift(newReview)
            //    const save_review = await newReview.save()
            //    return res.status(200).json({message: "Successful", save_review})
            // }
            // if(!find_product) {
            //     return res.status(500).json({message: "Internal Error"})  
            // }

            // } catch (error) {
            //     if (error.isJoi === true) {
            //         return res.status(400)
            //             .json({
            //                 status: false,
            //                 code: 400,
            //                 message: "There's error in your inputs",
            //             })
            //     }
            //     return next(error);
            // }
        }



