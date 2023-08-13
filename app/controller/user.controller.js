const userService = require("../services/user.service");



exports.register = async (req, res) => {
  try {
    const users = await userService.register(req.body, res);
    res.json({ data: users.token, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
    try{
     const users = await userService.login(req, res);
     console.log('userData', users);
     res.status(201).json({ data: users ,status: "success" });
    
    }catch(err){
        res.status(500).json({error: err.message})
    }
}

exports.getAllUsers = async (req, res) => {
  try{
    const userDetails = await userService.getUsers(req, res);
    console.log("details 2", userDetails);
    res.status(201).json({ data: userDetails ,status: "success" });

  }catch(err){
      res.status(500).json({error: err.message})
  }
}

exports.getCartDetails = async (req, res) => {
  try{
    const cartItems = await userService.getCartDetails(req, res);
    console.log("details 2", cartItems);
    res.status(201).json({ data: cartItems ,status: "success" });

  }catch(err){
      res.status(500).json({error: err.message})
  }
}

exports.addedToCart = async (req, res) => {
  try{
    const cart = await userService.addToCart(req, res);
    console.log("cart", cart);
    res.status(201).json({ data: cart ,status: "success" });

  }catch(err){
      res.status(500).json({error: err.message})
  }
}

exports.deleteCartItem = async (req, res) => {
  try{
    const userDetails = await userService.deleteCartItem(req, res);
    console.log("cart", userDetails);
    res.status(201).json({ data: userDetails ,status: "success" });

  }catch(err){
      res.status(500).json({error: err.message})
  }
}

