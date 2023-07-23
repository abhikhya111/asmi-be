const mongoose = require('mongoose');

// Define the schema
const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  img: {
    data: Buffer,
    contentType: String
  },
  colors: {
    type: [String]
  },
  sizes: {
    type: [String],
  },
  title: {
    type: String,
  },
  titleDescription: {
    type: String,
  },
  offerPrice: {
    type: String,
  },
  mrp: {
    type: String,
  },
  discountPercentage: {
    type: String,
  },
  material: {
    type: String,
  },
  instruction: {
    type: String,
  },
  length: {
    type: String,
  },
  theme: {
    type: String,
  },
  style: {
    type: String,
  },
  closureType: {
    type: String,
  },
  country: {
    type: String,
  },
  aboutItem: {
    type: String,
  },
  longDscription: {
    type: String,
  },
  manufacturer: {
    type: String,
  },
  weight: {
    type: String,
  },
  packer: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create a model based on the schema
module.exports = mongoose.model("products", productSchema);
