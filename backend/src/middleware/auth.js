const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    const authHeader = req.Header.authorization;
    if (!authHeader || !authHeader.startswith("Bearer")) {
      return res.status(401).json({
        message: "Not allowed.Please Login.",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.Jwt_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expird token",
    });
  }
};

module.exports = protect;
