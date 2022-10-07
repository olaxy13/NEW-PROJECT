const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    products: [
      {
        productId: {
          type: Number,
        },
        quantity: {
          type:Number,
          default: 1,
        },
        name: {
          type: String
        } ,
        price:{
          type: Number
        }  
      }
    ],
    active: {
      type: Boolean,
      default: true
    },
    modifiedOn: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

const Cart = mongoose.model(/*name*/ "cart", cartSchema, /*collection:*/ 'Cart');
module.exports = Cart;