const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  bikeId: { type: String, required: true },
  userEmail: { type: String, required: true }, // Added field to store user's email
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  // Add more fields as needed
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
