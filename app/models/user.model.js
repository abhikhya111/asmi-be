const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const keysecret = process.env.KEY

// Define the schema
const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("not valid email address");
      }
    }
  },
  mobile: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  cpassword: {
    type: String,
    required: true,
    minlength: 6
  },
  quantity: {
    type: String,
    required: true,
    minlength: 100
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ],
  carts: Array
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 12);
      this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});

// generting token
userSchema.methods.generatAuthtoken = async function(){
  try {
      // let token = jwt.sign({ _id:this._id},keysecret,{
      //     expiresIn:"1d"
      // });
      // console.log("My Token",token);
      // this.tokens = this.tokens.concat({token:token});
      // await this.save();
      // return token;

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(keysecret, salt);
      this.password = hashedPassword;
      next();

  } catch (error) {
      console.log(error);
  }
}

const User = new mongoose.model("USER", userSchema);

module.exports = User;
// Create a model based on the schema


