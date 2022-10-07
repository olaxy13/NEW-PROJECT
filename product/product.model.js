const mongoose = require("mongoose");
const Schema = mongoose.Schema

const productSchema = new Schema ({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    video: {
        type: String,
        required: true,
    },
    categories: {
        type: Array
    },
    rate: {
        type: String,
    },
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