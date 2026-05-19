import Product from "./product.model.js";

//create product by admin
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      createdBy: req.user.id,
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: "Error creating product" });
  }
};

//GET ALL PRODUCTS (PUBLIC)
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

//GET SINGLE PRODUCT
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product" });
  }
};

//UPDATE PRODUCT (ADMIN)
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({message:"Product Updated"}, product);
  } catch (err) {
    res.status(500).json({message:"Error updating product"})
  }
};

//DELETE PRODUCT (ADMIN)
export const deleteProduct = async(req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        res.json({message:"Product deleted"});
    } catch (err) {
        res.status(500).json({message:"Error deleting product"})
    }
}
















