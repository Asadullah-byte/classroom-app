const jwt = require("jsonwebtoken");

const generateTokenAndSetCookies = (res, teacherId) => {
  const token = jwt.sign({ teacherId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

module.exports = {
  generateTokenAndSetCookies
}