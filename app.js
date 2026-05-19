import express from 'express';
import cors from 'cors';
import authRouter from './modules/auth/auth.routes.js';
import productRouter from './modules/product/product.routes.js';
import orderRouter from './modules/order/order.routes.js';
import adminRouter from './modules/admin/admin.routes.js';
import notificationRouter from './modules/notification/notification.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/admin", adminRouter);
app.use("/api/notifications", notificationRouter);

export default app;