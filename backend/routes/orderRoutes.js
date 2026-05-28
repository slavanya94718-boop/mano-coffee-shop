const express = require('express');
const Order = require('../models/Order');
const auth = require('../middleware/auth');

const router = express.Router();

// Place New Order - Protected
router.post('/', auth, async (req, res) => {
  try {
    const order = new Order({
      ...req.body,
      userId: req.user.id
    });
    await order.save();
    res.status(201).json({ message: "Order placed successfully!", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get User's Orders - Protected
router.get('/myorders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;