const express = require('express');
const { checkAuth } = require('../middleware/auth');
const orderRouter = express.Router();
const orderController = require('../controllers/order');

// order
orderRouter.get('/me', checkAuth(), orderController.getMyOrders);
orderRouter.get('/', checkAuth('admin'), orderController.getOrders);
orderRouter.get('/:id', checkAuth(), orderController.getOneOrder);
orderRouter.post('/', checkAuth(), orderController.receiveOrder);

module.exports = orderRouter;
