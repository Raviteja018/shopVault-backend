import express from 'express';
import { adminProtect } from '../../middleware/admin.middleware.js';
import { getAdminNotifications, markAllAsRead, markAsRead, deleteNotification } from './notification.controller.js';

const router = express.Router();

// All notification routes should be protected for admin only
router.use(adminProtect);

router.get('/', getAdminNotifications);
router.put('/read-all', markAllAsRead);
router.put('/:id/read', markAsRead);
router.delete('/:id', deleteNotification);

export default router;
