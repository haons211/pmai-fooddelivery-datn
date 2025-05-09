const foodModal = require("../models/foodModal");
const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");
const restaurantModel = require("../models/restaurantModel");

// CREATE FOOD
const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    } = req.body;

    if (!title || !description || !price || !restaurant) {
      return res.status(400).send({
        success: false,
        message: "Please provide all required fields",
      });
    }
    const newFood = new foodModal({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    });

    await newFood.save();
    res.status(201).send({
      success: true,
      message: "New Food Item Created Successfully",
      data: { food: newFood },
    });
  } catch (error) {
    console.log("Error in Create Food API:", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};

// GET ALL FOODS
const getAllFoodsController = async (req, res) => {
  try {
    const foods = await foodModal.find({});
    res.status(200).send({
      success: true,
      message: "Food Items Retrieved Successfully",
      data: { 
        totalFoods: foods.length,
        foods 
      },
    });
  } catch (error) {
    console.log("Error in Get All Foods API:", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};

// GET SINGLE FOOD
const getSingleFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(400).send({
        success: false,
        message: "Please provide food ID",
      });
    }
    const food = await foodModal.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Food Item Retrieved Successfully",
      data: { food },
    });
  } catch (error) {
    console.log("Error in Get Single Food API:", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};

// GET FOOD BY RESTAURANT
const getFoodByRestaurantController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(400).send({
        success: false,
        message: "Please provide restaurant ID",
      });
    }
    const food = await foodModal.find({ restaurant: restaurantId });
    res.status(200).send({
      success: true,
      message: "Foods Retrieved By Restaurant Successfully",
      data: { 
        restaurant: restaurantId,
        foods: food 
      },
    });
  } catch (error) {
    console.log("Error in Get Food By Restaurant API:", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};

// UPDATE FOOD ITEM
const updateFoodController = async (req, res) => {
  try {
    const foodID = req.params.id;
    if (!foodID) {
      return res.status(400).send({
        success: false,
        message: "Please provide food ID",
      });
    }
    const food = await foodModal.findById(foodID);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    } = req.body;
    const updatedFood = await foodModal.findByIdAndUpdate(
      foodID,
      {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        category,
        code,
        isAvailable,
        restaurant,
        rating,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Food Item Updated Successfully",
      data: { food: updatedFood },
    });
  } catch (error) {
    console.log("Error in Update Food API:", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};

// DELETE FOOD
const deleteFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(400).send({
        success: false,
        message: "Please provide food ID",
      });
    }
    const food = await foodModal.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }
    await foodModal.findByIdAndDelete(foodId);
    res.status(200).send({
      success: true,
      message: "Food Item Deleted Successfully",
      data: { foodId },
    });
  } catch (error) {
    console.log("Error in Delete Food API:", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};

// PLACE ORDER
const placeOrderController = async (req, res) => {
  try {
    const { cart } = req.body;
    if (!cart || !cart.length) {
      return res.status(400).send({
        success: false,
        message: "Please provide food cart items",
      });
    }
    let total = 0;
    //calculate total
    cart.map((i) => {
      total += i.price;
    });

    const newOrder = new orderModel({
      foods: cart,
      payment: total,
      buyer: req.body.id,
    });
    await newOrder.save();
    res.status(201).send({
      success: true,
      message: "Order Placed Successfully",
      data: { order: newOrder },
    });
  } catch (error) {
    console.log("Error in Place Order API:", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};

// ORDER STATUS CONTROLLER
const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const loggedInUserId = req.body.id;
    
    // Validation
    if (!orderId) {
      return res.status(400).send({
        success: false,
        message: "Please provide order ID",
      });
    }
    if (!status) {
      return res.status(400).send({
        success: false,
        message: "Please provide order status",
      });
    }
    
    // Find order
    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).send({
        success: false,
        message: "Order not found",
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
    
    // Access control based on role and relationship to the order
    const isAdmin = loggedInUser.usertype === "admin";
    const isVendor = loggedInUser.usertype === "vendor";
    const isOrderOwner = order.user && order.user.toString() === loggedInUserId;
    const isRestaurantOwner = order.restaurant && 
                             await restaurantModel.exists({
                               _id: order.restaurant,
                               user: loggedInUserId
                             });
    
    // Only admin, vendor who owns the restaurant, or in some cases the order owner can update status
    if (!isAdmin && !isRestaurantOwner && !(isOrderOwner && status === "cancelled")) {
      return res.status(403).send({
        success: false,
        message: "Unauthorized: You don't have permission to update this order's status",
      });
    }
    
    // Status transition rules
    // Logic can be expanded based on allowed status transitions
    if (isOrderOwner && status !== "cancelled") {
      return res.status(403).send({
        success: false,
        message: "Customers can only cancel their own orders, not change to other statuses",
      });
    }
    
    // Proceed with status update
    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Order Status Updated Successfully",
      data: { order: updatedOrder },
    });
  } catch (error) {
    console.log("Error in Order Status API:", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};

module.exports = {
  createFoodController,
  getAllFoodsController,
  getSingleFoodController,
  getFoodByRestaurantController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
};
