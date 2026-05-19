import mongoose, { mongo } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ["Electronics", "Clothing", "Accessories", "Footwear", "Fitness"],
    },
    stock: {
      type: Number,
      default: 0,
    },
    image: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);
const Product = mongoose.model("Product", productSchema);

export default Product;