const UserModel = require("../models/user.model");
const ProductModel = require("../models/product.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keysecret = process.env.KEY

exports.register = async (req, res) => {
  const { fname, email, mobile, password, cpassword } = req;
  console.log(cpassword);
  try {
    const preuser = await UserModel.findOne({ email });
    if (preuser) {
      res.status(422).json({ error: "This email is already exist" });
    } else if (password !== cpassword) {
      res.status(422).json({ error: "password are not matching" });;
    } else {

      const finaluser = new UserModel({
        fname, email, mobile, password, cpassword
      });

      // yaha pe hasing krenge

      const storedata = await finaluser.save();
      // console.log(storedata + "user successfully added");
      res.status(201).json(storedata);
    }
  }
  catch (error) {
    res.status(500).json({ error: error.message });

  }
};

// login user
exports.login = async (req, res) => {
  // console.log(req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "fill the details" });
  }

  try {

    const userlogin = await UserModel.findOne({ email: email });
    const isMatch = await bcrypt.compare(password, userlogin.password);
    console.log(userlogin);
    if (userlogin) {
      console.log("is match", isMatch);

    } else {
      res.status(400).json({ error: "user not exist" });
    }



    if (!isMatch) {
      res.status(400).json({ error: "invalid crediential pass" });
    } else {
      // Generate a JWT token
      const token = jwt.sign({ userId: UserModel._id }, keysecret, { expiresIn: '1d' });
      const tokenAdded = await UserModel.findOneAndUpdate(
        { email },
        { tokens: { token } },
        { new: true });
      res.cookie("AsmiBoutique", token, {
        expires: new Date(Date.now() + 2589000),
        httpOnly: true
      });
      // Send the token back to the user
      res.status(201).json({ userlogin, token });
    }

  } catch (error) {
    console.log(error.message);
  }
};

exports.addToCart = async (req, res) => {
  try {
    const id = req.params.id;
    const email = req.body.email;
    // const carts = await ProductModel.findOne({productId:id});
    const UserContact = await UserModel.findOne({ email: email })

    if (UserContact) {
      const cartItemAdded = await UserModel.findOneAndUpdate(
        {email: email},
        { $push: { carts: {
          productId:req.body.product.productId,
          productName:req.body.product.productName,
          longDescription:req.body.product.longDescription,
          mrp:req.body.product.mrp,
          color: req.body.selectedColor,
          size: req.body.selectedSize,
          quantity: req.body.selectedQuantity
        } 
      } 
    },
        {new: true} );
      console.log(cartItemAdded);
      return cartItemAdded
    }
    else {
      res.status(401).json({ error: "Contact not found" });
    }
  }
  catch (error) {
    console.log({ error: error.message })
  }
};
exports.getUsers = async (req, res) => {
  try {
    const email = req.body.email;
    const userDetails = await UserModel.findOne({ email: email })

    if (userDetails) {
      console.log("Details", userDetails);
      return userDetails
    }
    else {
      res.status(401).json({ error: "User not found" });
    }
  }
  catch (error) {
    console.log({ error: error.message })
  }
};
exports.getCartDetails = async (req, res) => {
  try {
    const email = req.params.email;
    const userDetails = await UserModel.findOne({ email: email })

    if (userDetails) {
      console.log("Details", userDetails);
      return userDetails
    }
    else {
      res.status(401).json({ error: "User not found" });
    }
  }
  catch (error) {
    console.log({ error: error.message })
  }
};
exports.deleteCartItem = async (req, res) => {
  try {
    const email = req.params.email;
    const userDetails = await UserModel.findOne({ email: email })
    const productId = req.body.productId;


    if (userDetails) {
      console.log("Details", userDetails);
      const updatedUser = await UserModel.findOneAndUpdate(
        { email:email },
        { $pull: { carts: { productId: productId } } },
        { new: true }
      );
      return updatedUser;

    }
    else {
      res.status(401).json({ error: "User not found" });
    }
  }
  catch (error) {
    console.log({ error: error.message })
  }
};



