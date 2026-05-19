import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  recipient: { type: String, enum: ['admin'], default: 'admin' },
  type: { type: String, enum: ['NEW_ORDER', 'LOW_STOCK', 'SYSTEM'], required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  link: { type: String }, // Optional: URL to redirect when clicked
  isRead: { type: Boolean, default: false },
}, { timestamps: true });

export const Notification = mongoose.model('Notification', notificationSchema);
