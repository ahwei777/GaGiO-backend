const express = require('express');
const { checkAuth } = require('../middleware/auth');
const orderRouter = express.Router();
const orderController = require('../controllers/order');

// order
orderRouter.get('/', checkAuth('admin'), orderController.getOrderList);
orderRouter.get('/:id', checkAuth(), orderController.getOrder);
orderRouter.post('/', checkAuth(), orderController.receiveOrder);

module.exports = orderRouter;
