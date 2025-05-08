const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

// REGISTER
const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, address, answer } = req.body;
    //validation
    if (!userName || !email || !password || !address || !phone || !answer) {
      return res.status(400).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }
    // check user
    const exisiting = await userModel.findOne({ email });
    if (exisiting) {
      return res.status(409).send({
        success: false,
        message: "Email Already Registered please Login",
      });
    }
    //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //create new user
    const user = await userModel.create({
      userName,
      email,
      password: hashedPassword,
      address,
      phone,
      answer,
    });
    
    // Remove password from response
    user.password = undefined;
    
    res.status(201).send({
      success: true,
      message: "Successfully Registered",
      data: { user },
    });
  } catch (error) {
    console.log("Error in Register API:", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};

// LOGIN
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please Provide Email AND Password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    //check user password  | compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    // token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      data: { token, user },
    });
  } catch (error) {
    console.log("Error in Login API:", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};

module.exports = { registerController, loginController };
