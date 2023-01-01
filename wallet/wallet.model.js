const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const walletSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
    balance: {
        type: Number,
        default: 0
    },
    balance_before : {
        type: Number,
        default: 0
    },
}, { timestamps: true });

const Wallet = mongoose.model(/*name*/ 'wallet', walletSchema, /*collection:*/ 'Wallets');
module.exports = Wallet;