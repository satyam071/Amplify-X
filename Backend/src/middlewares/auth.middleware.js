const jwt = require("jsonwebtoken");

async function authArtist(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "artist") {
      return res.status(403).json({ message: "You don't have an access" });
    }

    req.user = decoded

    next();
  } catch (err) {
    return res.status(401).json({
      message: "forbidden",
      err,
    });
  }
}

async function authUser(req,res,next){
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "user" && decoded.role !=="artist" ) {
      return res.status(403).json({ message: "You don't have an access" });
    }

    req.user = decoded

    next();
  } catch (err) {
    return res.status(401).json({
      message: "forbidden",
      err,
    });
  }
}

module.exports = {authArtist , authUser};
