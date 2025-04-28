const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  category: String,
  description: String,
});

const Product = mongoose.model("product", productSchema);

exports.getAllProducts = async () => {
  try {
    const products = await Product.find({});
    return products;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
exports.getProductByCategory = async (category) => {
    try {
      const products = await Product.find({ category });  // Use find() instead of findOne()
      return products;  // This will return an array of products
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

exports.createProduct = async (product) => {
  try {
    const newProduct = await Product.create(product);
    return newProduct;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.updateProduct = async (id, product) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    return updatedProduct;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
exports.deleteProduct = async (id) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    return deletedProduct;
  } catch (error) {
    console.error(error);
    throw error;
  }
};