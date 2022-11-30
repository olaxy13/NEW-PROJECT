const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const walletSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
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
    },
    balance_before : {
        type: Number,
        default: 0
    },
}, { timestamps: true });

const Wallet = mongoose.model(/*name*/ 'wallet', walletSchema, /*collection:*/ 'Wallets');
module.exports = Wallet;