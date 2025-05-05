const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { addToCart, getCart } = require('../controllers/cartController');
const router = express.Router();

router.route('/')
  .get(protect, getCart)
  .post(protect, addToCart);

module.exports = router;
