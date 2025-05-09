const restaurantModel = require("../models/restaurantModel");
const userModel = require("../models/userModel");

// CREATE RESTAURANT
const createRestaurantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;
    // validation
    if (!title || !coords) {
      return res.status(400).send({
        success: false,
        message: "Please provide title and address",
      });
    }
    const newRestaurant = new restaurantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });

    await newRestaurant.save();

    res.status(201).send({
      success: true,
      message: "New Restaurant Created Successfully",
      data: { restaurant: newRestaurant },
    });
  } catch (error) {
    console.log("Error in Create Restaurant API:", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};

// GET ALL RESTAURANT
const getAllRestaurantController = async (req, res) => {
  try {
    const restaurants = await restaurantModel.find({});
    res.status(200).send({
      success: true,
      message: "Restaurants Retrieved Successfully",
      data: {
        totalCount: restaurants.length,
        restaurants: restaurants
      },
    });
  } catch (error) {
    console.log("Error in Get All Restaurants API:", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};

// GET RESTAURANT BY ID
const getRestaurantByIdController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(400).send({
        success: false,
        message: "Please Provide Restaurant ID",
      });
    }
    //find restaurant
    const restaurant = await restaurantModel.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: "Restaurant Not Found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Restaurant Retrieved Successfully",
      data: { restaurant: restaurant },
    });
  } catch (error) {
    console.log("Error in Get Restaurant by ID API:", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};

//DELETE RESTAURANT
const deleteRestaurantController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const loggedInUserId = req.body.id;
    
    if (!restaurantId) {
      return res.status(400).send({
        success: false,
        message: "Please Provide Restaurant ID",
      });
    }
    
    // Find restaurant to be deleted
    const restaurant = await restaurantModel.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: "Restaurant Not Found",
      });
    }
    
    // Find logged in user to check their role
    const loggedInUser = await userModel.findById(loggedInUserId);
    if (!loggedInUser) {
      return res.status(404).send({
        success: false,
        message: "Logged in user not found",
      });
    }
    
    // Check if user is restaurant owner or admin
    const isOwner = restaurant.user && restaurant.user.toString() === loggedInUserId;
    const isAdmin = loggedInUser.usertype === "admin";
    
    if (!isOwner && !isAdmin) {
      return res.status(403).send({
        success: false,
        message: "Unauthorized: Only restaurant owner or admin can delete this restaurant",
      });
    }
    
    // Proceed with deletion
    await restaurantModel.findByIdAndDelete(restaurantId);
    res.status(200).send({
      success: true,
      message: "Restaurant Deleted Successfully",
      data: { restaurantId: restaurantId },
    });
  } catch (error) {
    console.log("Error in Delete Restaurant API:", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};

module.exports = {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantByIdController,
  deleteRestaurantController,
};
