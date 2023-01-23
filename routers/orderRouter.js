import express from 'express';
import {
  createOrder,
  deleteOrder,
  deliverOrder,
  getMyOrders,
  getOrder,
  getOrders,
  payOrder,
} from '../controllers/orderController.js';
import { isAdmin, isAuth, isSellerOrAdmin } from '../utils.js';

const orderRouter = express.Router();

orderRouter.get('/', isAuth, isSellerOrAdmin, getOrders);
orderRouter.get('/mine', isAuth, getMyOrders);
orderRouter.post('/', isAuth, createOrder);
orderRouter.get('/:id', isAuth, getOrder);
orderRouter.put('/:id/pay', isAuth, payOrder);
orderRouter.delete('/:id', isAuth, isAdmin, deleteOrder);
orderRouter.put('/:id/deliver', isAuth, isAdmin, deliverOrder);

export default orderRouter;
