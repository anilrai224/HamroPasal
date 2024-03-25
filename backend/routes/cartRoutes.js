const express = require('express');
const { addToCart, cartItems, removeFromCart } = require('../controllers/cartController');

const router = express.Router();

router.post('/addToCart',addToCart);
router.post('/getCartItems',cartItems);
router.post('/removeFromCart',removeFromCart);

module.exports = router;