const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = decoded.user; // 👈 Must match what you set in login
      next();
    } catch (err) {
      res.status(401);
      throw new Error("User is not authorised");
    }
  } else {
    res.status(401);
    throw new Error("No token provided");
  }
});

module.exports = validateToken;
