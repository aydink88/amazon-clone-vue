import express from 'express';
import {
  createProduct,
  createReview,
  deleteProduct,
  getCategories,
  getProduct,
  getProducts,
  seedProducts,
  updateProduct,
} from '../controllers/productController.js';
import { isAdmin, isAuth, isSellerOrAdmin } from '../utils.js';

const productRouter = express.Router();

productRouter.get('/', getProducts);
productRouter.get('/categories', getCategories);
productRouter.get('/seed', seedProducts);
productRouter.get('/:id', getProduct);
productRouter.post('/', isAuth, isSellerOrAdmin, createProduct);
productRouter.put('/:id', isAuth, isSellerOrAdmin, updateProduct);
productRouter.delete('/:id', isAuth, isAdmin, deleteProduct);
productRouter.post('/id/reviews', isAuth, createReview);
export default productRouter;
