// src/utils/seed.js

import Product from "../modules/product/product.model.js";
import { connectDB } from "../config/db.js";

const productsArray = [
  {
    name: "Nike Air Max",
    price: 5500,
    category: "Footwear",
    stock: 20,
    image: "nike-airmax.jpg",
  },
  {
    name: "Adidas Running Shoes",
    price: 4800,
    category: "Footwear",
    stock: 15,
    image: "adidas-running.jpg",
  },
  {
    name: "Men's Cotton T-Shirt",
    price: 799,
    category: "Clothing",
    stock: 50,
    image: "tshirt.jpg",
  },
  {
    name: "Women's Denim Jacket",
    price: 2499,
    category: "Clothing",
    stock: 25,
    image: "denim-jacket.jpg",
  },
  {
    name: "Apple AirPods Pro",
    price: 24000,
    category: "Electronics",
    stock: 12,
    image: "airpods.jpg",
  },
  {
    name: "Samsung 55\" Smart TV",
    price: 52000,
    category: "Electronics",
    stock: 8,
    image: "samsung-tv.jpg",
  },
  {
    name: "Leather Wallet",
    price: 999,
    category: "Accessories",
    stock: 40,
    image: "wallet.jpg",
  },
  {
    name: "Casio Analog Watch",
    price: 2999,
    category: "Accessories",
    stock: 18,
    image: "watch.jpg",
  },
  {
    name: "Gym Dumbbell Set (10kg)",
    price: 2200,
    category: "Fitness",
    stock: 10,
    image: "dumbbells.jpg",
  },
];

const seedProducts = async () => {
  try {
    await connectDB();

    await Product.deleteMany(); // ⚠️ clears old data (optional but useful)

    await Product.insertMany(productsArray);

    console.log("✅ Products seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding error:", error.message);
    process.exit(1);
  }
};

seedProducts();





