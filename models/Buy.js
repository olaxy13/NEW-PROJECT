const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema ({
    full_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    reference: {
        type: String,
        required: true
    }
    
})

const Payment = mongoose.model(/*name*/ 'payment', paymentSchema, /*collection:*/ "PAYMENTS");
module.exports = Payment;