const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const transactionSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  reference: {
    type: String,
    required: true
  }
  });
  // hashPasswordPlugin(TransactionSchema)
  const Transaction = mongoose.model(/*name*/ 'transactionsRef', transactionSchema, /*collection:*/ 'Transactions');
  module.exports = Transaction;