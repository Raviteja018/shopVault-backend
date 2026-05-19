import express from 'express';
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from './product.controller.js';
import { adminProtect, isAdmin } from '../../middleware/admin.middleware.js';

const productRouter = express.Router();

//PUBLIC
productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);

//ADMIN
productRouter.post("/",  adminProtect, isAdmin, createProduct);
productRouter.put("/:id",  adminProtect, isAdmin, updateProduct);
productRouter.delete("/:id", adminProtect, isAdmin, deleteProduct);

export default productRouter;
