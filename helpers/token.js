const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send("Authentication failed, no token!");
    }
    const decodedToken = jwt.verify(token, "SECRET_KEY");
    req.userData = {
      userId: decodedToken.userId,
    };
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).send("Authentication failed!");
  }
};
