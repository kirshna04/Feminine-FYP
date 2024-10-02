const jwt = require("jsonwebtoken");

const generate_token = async (payload) => {
  let token = await jwt.sign({ payload }, process.env.SCERET_KEY, {
    expiresIn: "7d",
  });
  return token;
};

const authorized = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(404).json({ msg: "AUTH TOKEN IS REQUIRED" });
  }
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    let verify = jwt.verify(token, process.env.SCERET_KEY);
    if (verify) {
      next();
    } else {
      res.status(401).json({ msg: "INVALID TOKEN YOU CANNOT ACCESS THIS API" });
    }
  } else {
    res.status(404).json({ msg: "AUTH TOKEN IS REQUIRED" });
  }
};

module.exports = { generate_token, authorized };
