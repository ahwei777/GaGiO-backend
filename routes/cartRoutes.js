const express = require('express');
const { checkAuth } = require('../middleware/auth');
const cartRouter = express.Router();
const cartController = require('../controllers/cart');

// cart
cartRouter.get('/', checkAuth(), cartController.getCartList);
cartRouter.post('/cart-item/:id', checkAuth(), cartController.addCartItem);
cartRouter.delete('/cart-item/:id', checkAuth(), cartController.deleteCartItem);

module.exports = cartRouter;
