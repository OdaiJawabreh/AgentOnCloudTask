const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  console.log("ddddd",req.headers.authorization);
  try {
    if (!req.headers.authorization) {
      console.log("bashar");
      return res.status(403).json({
        success: false,
        message: `Forbidden`,
      });
    }
    const token = req.headers.authorization.split(" ").pop();

    jwt.verify(token, process.env.SECRET, (err, result) => {
      if (err) {
        res.status(403).json({
          success: false,
          message: `The token is invalid or expired`,
          // err: err,
        });
      } else {
        req.token = result;
        next();
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Server Error`,
      // err: err,
    });
  }
};

module.exports = { authentication };
