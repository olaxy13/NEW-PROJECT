const mongoose = require("mongoose");
const Schema = mongoose.Schema

const productSchema = new Schema ({
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
    review: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },

},
{ timestamps: true}
);

const Product = mongoose.model(/*name*/ "products", productSchema, /*collection:*/ 'Products');
module.exports = Product;