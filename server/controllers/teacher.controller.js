const bcrypt = require("bcrypt");
const crypto = require("crypto");

const Teacher = require("../models/teacher.model");
const {
  generateVerificationToken,
} = require("../utils/generateVerificationToken.js");
const {
  generateTokenAndSetCookies,
} = require("../utils/generateTokenAndSetCookies.js");
const {
  sentVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
} = require("../mailtrap/email.js");

async function handleAddTeacher(req, res) {
  const { email, password, name } = req.body;

  try {
    //validate fields
    if (!email || !password || !name) {
      throw new Error("All Field Are required");
    }

    //check for teacher if already exists
    const teacherExists = await Teacher.findOne({ email });
    if (teacherExists) {
      return res.status(400).json({ success: false, message: "User Exists" });
    }

    //hashing password
    const hashPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateVerificationToken();

    const teacher = new Teacher({
      email,
      password: hashPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    await teacher.save();

    //jwt token and cookies

    generateTokenAndSetCookies(res, teacher._id);

    await sentVerificationEmail(teacher.email, verificationToken);

    res.status(201).json({
      success: true,
      message: "Teacher Created Successfully",
      teacher: {
        ...teacher._doc,
        password: undefined,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function verifyEmail(req, res) {
  const { code } = req.body;

  try {
    const teacher = await Teacher.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });
    if (!teacher) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    teacher.isVerified = true;
    teacher.verificationToken = undefined;
    teacher.verificationTokenExpiresAt = undefined;
    await teacher.save();

    await sendWelcomeEmail(teacher.email, teacher.name);

    res.status(200).json({
      success: true,
      message: "Email Verified",
      teacher: {
        ...teacher._doc,
        password: undefined,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const teacher = await Teacher.findOne({ email });

    if (!teacher) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, teacher.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    generateTokenAndSetCookies(res, teacher._id);
    teacher.lastLogin = new Date(Date().now);
    teacher.save();

    res.status(200).json({
      success: true,
      message: "Teacher Logged in Successfully",
      teacher: {
        ...teacher._doc,
        password: undefined,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function forgotPassword(req, res) {
  const { email } = req.body;

  try {
    const teacher = await Teacher.findOne({ email });

    if (!teacher) {
      return res
        .status(400)
        .json({ success: false, message: "Teacher Doesn't exists" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

    teacher.resetPasswordToken = resetToken;
    teacher.resetPasswordExpiresAt = resetTokenExpiresAt;

    await teacher.save();

    await sendPasswordResetEmail(
      teacher.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );

    res.status(200).json({
      success: true,
      message: "Password reset Link send successfully",
    });
  } catch (err) {
    console.log("Error in forgotPassword", err);
    res.status(400).json({ success: false, message: err.message });
  }
}

async function resetPassword(req, res) {
  const { token } = req.params;
  const { password } = req.body;

  const teacher = await Teacher.findOne({
    resetPasswordToken: token,
    resetPasswordExpiresAt: { $gt: Date.now() },
  });

  if (!teacher) {
    return res
      .status(400)
      .json({ succces: false, message: "Invalid or expired reset token" });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  teacher.password = hashPassword;
  teacher.resetPasswordToken = undefined;
  teacher.resetPasswordExpiresAt = undefined;

  await teacher.save();

  sendResetSuccessEmail(teacher.email);

  res
    .status(200)
    .json({ success: true, message: "Password Reset Successfully" });
}

async function checkAuth(req, res) {
    try{
      const teacher = await Teacher.findOne(req.userId).select("-password");

      if(!teacher){
        return  res.status(400).json({success: false, message: "Teacher no found"})
      }

      res.status(200).json({success: true, teacher});
    }catch(err){
      return res.status(500).json({ message: err.message });
    }
}

module.exports = {
  handleAddTeacher,
  verifyEmail,
  login,
  forgotPassword,
  resetPassword,
  checkAuth
};
