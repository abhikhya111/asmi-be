const ProductModel = require("../models/product.model");
const UserModel = require("../models/user.model");

exports.getAllProducts = async () => {
  return await ProductModel.find();
};
 
exports.createProduct = async (product) => {
  return await ProductModel.create(product);
};
exports.getProductById = async (id) => {
  // return await ProductModel.findById(id);
  return await ProductModel.findOne({productId : id});
};
 
exports.updateProduct = async (id, product) => {
  return await ProductModel.findByIdAndUpdate(id, product);
};
 
exports.deleteProduct = async (id) => {
  return await ProductModel.findByIdAndDelete(id);
};

exports.userRegister = async (user) => {
 
  
}