const express = require("express");
const {
  register, login, addedToCart, getAllUsers, getCartDetails, deleteCartItem
} = require("../controller/user.controller");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/allUsers").get(getAllUsers);
router.route("/addToCart/:id").post(addedToCart);
router.route("/cartitems/:email").get(getCartDetails);
router.route("/cartitems/:email").delete(deleteCartItem);

module.exports = router;
