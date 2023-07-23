const UserModel = require("../models/user.model");
 

 
exports.register = async (user) => {
  return await UserModel.create(user);
};

exports.login = async (user) => {
    // return await UserModel.
}
