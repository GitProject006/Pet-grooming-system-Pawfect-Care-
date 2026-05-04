const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access Denied: No Token Provided" });
  }
    const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid Token" });
    }
    req.user = decoded;
    next(); 
  });
};

module.exports = verifyToken;