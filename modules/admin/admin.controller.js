// src/modules/admin/admin.controller.js
import User from "../user/user.model.js";
import Product from "../product/product.model.js";
import Order from "../order/order.model.js";

// 📊 GET DASHBOARD STATS
export const getStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const products = await Product.countDocuments();
    const orders = await Order.countDocuments();

    const revenueData = await Order.aggregate([
      { $match: { paymentStatus: "paid" } },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" },
        },
      },
    ]);
    const revenue = revenueData[0]?.total || 0;

    // Aggregate monthly revenue for the chart
    const monthlyRevenue = await Order.aggregate([
      { $match: { paymentStatus: "paid" } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          revenue: { $sum: "$totalAmount" },
        },
      },
      { $sort: { _id: 1 } }
    ]);

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const chartData = months.map((month, index) => {
      const monthData = monthlyRevenue.find(item => item._id === index + 1);
      return {
        name: month,
        revenue: monthData ? monthData.revenue : 0
      };
    });

    res.json({ users, products, orders, revenue, chartData });
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats" });
  }
};


// 📦 GET ALL ORDERS
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
};


// 👤 GET ALL USERS
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } }).select("-password");

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

// 🔄 TOGGLE USER STATUS
export const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.json({ message: "User status updated", user: { _id: user._id, isActive: user.isActive } });
  } catch (error) {
    res.status(500).json({ message: "Error updating user status" });
  }
};


