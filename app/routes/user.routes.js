const express = require("express");
const {
  register, login, addedToCart, getAllUsers, getCartDetails, deleteCartItem,
  addAddress
} = require("../controller/user.controller");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/allUsers").get(getAllUsers);
router.route("/addToCart/:id").post(addedToCart);
router.route("/cartitems/:email").get(getCartDetails);
router.route("/cartitems/:email").delete(deleteCartItem);
router.route("/addAddress/:email").post(addAddress);

module.exports = router;
