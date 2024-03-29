const jwt = require("jsonwebtoken");
const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    console.log(token);
    if (!token) {
      return res.status(403).send("aadish");
    }
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    const verified = jwt.verify(token, "Aad");
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = verifyToken;
