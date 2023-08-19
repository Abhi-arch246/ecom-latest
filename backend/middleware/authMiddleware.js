const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECURITY_KEY);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401).send("Invalid Token");
    }
  } else {
    res.status(401).send("Not authorized");
  }
};

module.exports = { protect };
