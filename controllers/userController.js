const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

// GET USER INFO
const getUserController = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById(req.body.id);
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    //hide password
    user.password = undefined;
    //response
    res.status(200).send({
      success: true,
      message: "User Retrieved Successfully",
      data: { user },
    });
  } catch (error) {
    console.log("Error in Get User API:", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};

// UPDATE USER
const updateUserController = async (req, res) => {
  try {
    const userId = req.body.id;
    const updateUserId = req.body.updateUserId || userId; // If updateUserId not provided, default to self-update
    
    // Check if the user is trying to update someone else's profile
    if (userId !== updateUserId) {
      // Verify if the logged-in user is an admin
      const loggedInUser = await userModel.findById(userId);
      if (!loggedInUser || loggedInUser.usertype !== "admin") {
        return res.status(403).send({
          success: false,
          message: "Unauthorized: Only admins can update other users' profiles",
        });
      }
    }
    
    // find user to update
    const user = await userModel.findById(updateUserId);
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    //update
    const { userName, address, phone } = req.body;
    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    //save user
    await user.save();
    res.status(200).send({
      success: true,
      message: "User Updated Successfully",
      data: { user },
    });
  } catch (error) {
    console.log("Error in Update User API:", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};

// UPDATE USER PASSWORD
const updatePasswordController = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById(req.body.id);
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    // get data from user
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).send({
        success: false,
        message: "Please Provide Both Old and New Password",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).send({
        success: false,
        message: "New Password Must Be At Least 6 Characters Long",
      });
    }

    //check user password | compare password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid Old Password",
      });
    }
    //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Updated Successfully",
      data: { userId: user._id },
    });
  } catch (error) {
    console.log("Error in Update Password API:", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};

// RESET PASSWORD
const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(400).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).send({
        success: false,
        message: "New Password Must Be At Least 6 Characters Long",
      });
    }

    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found or Invalid Security Answer",
      });
    }
    //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
      data: { email },
    });
  } catch (error) {
    console.log("Error in Reset Password API:", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};

// DELETE PROFILE ACCOUNT
const deleteProfileController = async (req, res) => {
  try {
    const userId = req.params.id;
    const loggedInUserId = req.body.id;
    
    // Find the user to be deleted
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    
    // Find the logged in user to check their role
    const loggedInUser = await userModel.findById(loggedInUserId);
    if (!loggedInUser) {
      return res.status(404).send({
        success: false,
        message: "Logged in user not found",
      });
    }
    
    // Only allow deletion if:
    // 1. The user is deleting their own account (userId === loggedInUserId)
    // 2. The logged in user is an admin
    if (userId !== loggedInUserId && loggedInUser.usertype !== "admin") {
      return res.status(403).send({
        success: false,
        message: "Unauthorized: You can only delete your own account or you must be an admin",
      });
    }
    
    // Proceed with deletion
    await userModel.findByIdAndDelete(userId);
    return res.status(200).send({
      success: true,
      message: "Account Has Been Deleted Successfully",
      data: { userId },
    });
  } catch (error) {
    console.log("Error in Delete Profile API:", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};

module.exports = {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteProfileController,
};
