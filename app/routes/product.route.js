const express = require("express");
const {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controller/product.controller");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null, 'uploads')
  },

  fileName: (req,file,cb) => {
    cb(null, file.orignalName)
  }
})

// const upload = multer({storage:storage});

router.route("/").get(getAllProducts);
router.route("/create", upload.none()).post(createProduct);
router.route("/:id").get(getProductById).put(updateProduct).delete(deleteProduct);

module.exports = router;
