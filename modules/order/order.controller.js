import { Notification } from "../notification/notification.model.js";
import { generateOrderId } from "../../utils/generateOrderId.js";
import Product from "../product/product.model.js";
import Order from "./order.model.js";

export const createOrder = async (req, res) => {
  try {
    const { items, address } = req.body;

    if (!items || !items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    let totalAmount = 0;

    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ message: "Insufficient stock" });
      }

      //reduce stock
      product.stock -= item.quantity;
      await product.save();

      if (product.stock <= 5) {
        await Notification.create({
          type: "LOW_STOCK",
          title: "Low Stock Alert",
          message: `Stock for '${product.name}' is running low (${product.stock} left).`,
          link: `/admin/products`
        });
      }

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
      });
    }

    const order = await Order.create({
      orderId: generateOrderId(),
      user: req?.user?.id,
      items: orderItems,
      totalAmount,
      address,
    });

    await Notification.create({
      type: "NEW_ORDER",
      title: "New Order Received",
      message: `Order #${order.orderId} was just placed.`,
      link: `/admin/orders`
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: "Error creating order" });
  }
};

export const getUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).sort({
    createdAt: -1,
  });
  res.json(orders);
};

//update Order Status (ADMIN)
export const updateOrderStatus = async (req, res) => {
  const { orderStatus } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  order.orderStatus = orderStatus;

  await order.save();

  res.json(order);
};

//Update Payment Status (DUMMY)
export const updatePaymentStatus = async (req, res) => {
  const { paymentStatus } = req.body;

  const order = await Order.findById(req.params.id);

  order.paymentStatus = paymentStatus;
  order.paymentId = "PAY-" + Date.now();

  await order.save();

  if (paymentStatus === "failed") {
    await Notification.create({
      type: "SYSTEM",
      title: "Payment Failed",
      message: `Payment failed for Order #${order.orderId}.`,
      link: `/admin/orders`
    });
  }

  res.json(order);
};
