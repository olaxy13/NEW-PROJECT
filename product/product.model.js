const mongoose = require("mongoose");
const Schema = mongoose.Schema

const ProductSchema = new Schema ({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'

},
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    // video: {
    //     type: String,
    //     required: true,
    // },
    category: {
        type: Array
    },
    // rate: {
    //     type: String,
    // },
    price: {
        type: Number,
        required: true,
    },
    review: [
        //we are using an array method here so a user is accessed to a comment
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "users",
          },
          text: {
            type: String,
            required: true,
          },
          date: {
            type: Date,
            default: Date.now,
          },
        },
      ],

},
{ timestamps: true}
);

const product = mongoose.model(/*name*/ "product", ProductSchema, /*collection:*/ 'Product');
module.exports = product;