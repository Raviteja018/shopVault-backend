import express from 'express';
import { protect } from '../../middleware/auth.middleware.js';
import { createOrder, getUserOrders, updateOrderStatus, updatePaymentStatus } from './order.controller.js';
import { adminProtect, isAdmin } from '../../middleware/admin.middleware.js';


const orderRouter = express.Router();

//USER
orderRouter.post("/", protect, createOrder);
orderRouter.get("/my-orders", protect, getUserOrders);

//ADMIN
orderRouter.put("/:id/status", adminProtect, isAdmin, updateOrderStatus);
orderRouter.put("/:id/payment", protect, updatePaymentStatus)

export default orderRouter;