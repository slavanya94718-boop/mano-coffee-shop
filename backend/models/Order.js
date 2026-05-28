const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: String,
  name: String,
  address: String,
  mobile: String,
  items: Array,
  total: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);