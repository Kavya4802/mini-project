// transactiondb.js

const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  phoneNumber: {
    type: String, 
    required: true,
  },
});

const TransactionDB = mongoose.model('Transactions', paymentSchema);

module.exports = TransactionDB;
