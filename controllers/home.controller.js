const productsModel = require("../models/products.model");

exports.getHome = (req, res, next) => {
  const category = req.query.category || "All";

  // If category is not "All", fetch products by category, otherwise fetch all products
  const productsPromise = category !== "All" 
    ? productsModel.getProductByCategory(category)
    : productsModel.getAllProducts();

  productsPromise
    .then((products) => {
      res.render("index", { products });
    })
    .catch(next); // Automatically pass error to Express error handler
};
