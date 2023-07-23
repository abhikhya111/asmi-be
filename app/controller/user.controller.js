const userService = require("../services/user.service");



exports.register = async (req, res) => {
  try {
    const users = await userService.register(req.body);
    res.json({ data: users, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
    try{
     const users = await userServ
    }catch(err){
        res.status(500).json({error: err.message})
    }
}

