// transactiondb.js

const mongoose = require('mongoose');
const moment = require('moment');
const paymentSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },
  userName:{
    type: String
  },
  amount: {
    type: Number
  },
  timestamp: {
    type: String, 
    default: () => moment().format('DD/MM/YYYY h:mm A'),
  },
  phoneNumber: {
    type: String, 
  },
  startDate:{
    type:String
  },
  endDate:{
    type:String
  },
  bikeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  bikeName:{
    type:String
  }
});

const TransactionDB = mongoose.model('Transactions', paymentSchema);

module.exports = TransactionDB;
