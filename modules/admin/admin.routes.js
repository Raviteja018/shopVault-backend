// src/modules/admin/admin.routes.js

import express from "express";
import {
  getStats,
  getAllOrders,
  getAllUsers,
  toggleUserStatus,
} from "./admin.controller.js";

import { adminProtect, isAdmin } from "../../middleware/admin.middleware.js";

const adminRouter = express.Router();

adminRouter.get("/stats", adminProtect, isAdmin, getStats);
adminRouter.get("/orders", adminProtect, isAdmin, getAllOrders);
adminRouter.get("/users", adminProtect, isAdmin, getAllUsers);
adminRouter.put("/users/:id/status", adminProtect, isAdmin, toggleUserStatus);

export default adminRouter;