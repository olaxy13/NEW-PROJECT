const _ = require("underscore");
// const { authSchema, loginSchema } = require("../helper/validation")
const User = require("../auth/auth.model");
const Cart = require("./cart.model")
const vm = require("v-response");
const {createToken} = require ("../config/jwt")





exports.CreateCart = async (req, res, next) => {
    try {
        const { productId, quantity, name, price } = req.body;

        const userId = await User.findById(req.user_id)
        console.log(userId, "lkjhgc")
  
        //const userId = "5de7ffa74fff640a0491bc4f"; //TODO: the logged in user id
        let cart = await Cart.findOne({ userId });
        console.log(cart, "hfjd")
    
        if (cart) {
          //cart exists for user
          let itemIndex = cart.products.findIndex(p => p.productId == productId);
    
          if (itemIndex > -1) {
            //product exists in the cart, update the quantity
            let productItem = cart.products[itemIndex];
            productItem.quantity = quantity;
            cart.products[itemIndex] = productItem;
          } else {
            //product does not exists in cart, add new item
            cart.products.push({ productId, quantity, name, price });
          }
          cart = await cart.save();
          return res.status(201).send(cart);
        } else {
          //no cart for user, create new cart
          const newCart = await Cart.create({
            userId,
            products: [{ productId, quantity, name, price }]
          });
    
          return res.status(201).send(newCart);
        }
      } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
      }
}

