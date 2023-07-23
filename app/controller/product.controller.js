const productService = require("../services/product.service");
const UserModel = require("../models/user.model");


exports.getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json({ data: products, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    console.log(req.body)
    const products = await productService.createProduct(req.body);
    res.json({ data: products, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.json({ data: product, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const products = await productService.updateProduct(req.params.id, req.body);
    res.json({ data: products, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const products = await productService.deleteProduct(req.params.id);
    res.json({ data: products, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }


};

exports.register = async (req, res) => {
  const { fname, email, mobile, password, cpassword } = req.body;
  const finaluser = new User({
    fname, email, mobile, password, cpassword
  });

  // yaha pe hasing krenge

  const storedata = await finaluser.save();
  // console.log(storedata + "user successfully added");
  res.status(201).json(storedata);


};
