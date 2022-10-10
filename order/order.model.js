const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
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
      }
    ],
    amount: { 
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    status:{
        type: String,
        default: "pending"

    },
  },
  { timestamps: true }
);

const Order = mongoose.model(/*name*/ "order", OrderSchema, /*collection:*/ 'Order');
module.exports = Order;