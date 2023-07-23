const mongoose = require('mongoose');
const validator = require("validator");
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
  // tokens: [
  //   {
  //     token: {
  //       type: String,
  //       required: true
  //     }
  //   }
  // ],
  carts: Array
});

// Create a model based on the schema
module.exports = mongoose.model("users", userSchema);
