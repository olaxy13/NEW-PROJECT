const _ = require("underscore");
// const { authSchema, loginSchema } = require("../helper/validation")
const User = require("../auth/auth.model");
const Cart = require("./cart.model")
const vm = require("v-response");
const {createToken} = require ("../config/jwt");
const Product = require("../product/product.model");


//CREATE
exports.CreateCart = async (req, res, next) => {
  try{
    const newCart = new Cart(req.body);
    const savedCart = await newCart.save();
    return res.status(200).json(savedCart)
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

//UPDATE CART
exports.UpdateCart = async (req, res, next) => {
  try {
      const updated_cart = await Cart.findOne({id: req.body.id});
      console.log(updated_cart, "dfghj")
      Object.assign(updated_cart, req.body);
      updated_cart.save((err, savedCart) => {
          if (err) {
            console.log("saved-err:", err);
            return next();
          }
          return res.status(200).json({ status: "true", msg: "You have successfuly updated your cart", savedCart })
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


//DELETE CART
exports.DeleteCart = async (req, res, next) => {
  try {
      const find_cart = await Cart.findOne({id: req.body.id});
      if(find_cart) {
          await Cart.findByIdAndDelete(find_cart)
          return res.status(200).json({ status: true, msg:"You have Succesfully deleted cart"})
      } 
      return res.status(404).json({ status: false, msg:"cart does not Exist"})
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

//GET CART
exports.GetCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({id: req.body.id})
    return res.status(200).json(cart)
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

//GET CART ADMIB ONLY
// exports.GetCart = async (req, res, next) => {
//   try {
//     const carts = await Cart.findOne()
//     return res.status(200).json(carts)
//   } catch (error) {
//       if (error) {
//           return res.status(400)
//               .json({
//                   status: false,
//                   code: 400,
//                   message: "There's error in your inputs",
//               })
//       }
//       return next(error); 
//   }
// }


// exports.CreateCart = async (req, res, next) => {
//     try {
//         const { productId, quantity, name, price } = req.body;

//         const userId = await User.findById(req.user_id)
//         console.log(userId, "lkjhgc")
  
//         //const userId = "5de7ffa74fff640a0491bc4f"; //TODO: the logged in user id
//         let cart = await Cart.findOne({ userId });
//         console.log(cart, "hfjd")
    
//         if (cart) {
//           //cart exists for user
//           let itemIndex = cart.products.findIndex(p => p.productId == productId);
    
//           if (itemIndex > -1) {
//             //product exists in the cart, update the quantity
//             let productItem = cart.products[itemIndex];
//             productItem.quantity = quantity;
//             cart.products[itemIndex] = productItem;
//           } else {
//             //product does not exists in cart, add new item
//             cart.products.push({ productId, quantity, name, price });
//           }
//           cart = await cart.save();
//           return res.status(201).send(cart);
//         } else {
//           //no cart for user, create new cart
//           const newCart = await Cart.create({
//             userId,
//             products: [{ productId, quantity, name, price }]
//           });
    
//           return res.status(201).send(newCart);
//         }
//       } catch (err) {
//         console.log(err);
//         res.status(500).send("Something went wrong");
//       }
// }

