const categoryModel = require("../models/categoryModel");

// CREATE CATEGORY
const createCatController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    //validation
    if (!title) {
      return res.status(400).send({
        success: false,
        message: "Please provide category title",
      });
    }
    const newCategory = new categoryModel({ title, imageUrl });
    await newCategory.save();
    res.status(201).send({
      success: true,
      message: "Category created successfully",
      data: { category: newCategory },
    });
  } catch (error) {
    console.log("Error in Create Category API:", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};

// GET ALL CATEGORIES
const getAllCatController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    res.status(200).send({
      success: true,
      message: "Categories retrieved successfully",
      data: { 
        totalCategories: categories.length,
        categories 
      },
    });
  } catch (error) {
    console.log("Error in Get All Categories API:", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};

// UPDATE CATEGORY
const updateCatController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl } = req.body;
    
    if (!title) {
      return res.status(400).send({
        success: false,
        message: "Please provide category title",
      });
    }
    
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { title, imageUrl },
      { new: true }
    );
    
    if (!updatedCategory) {
      return res.status(404).send({
        success: false,
        message: "Category Not Found",
      });
    }
    
    res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
      data: { category: updatedCategory },
    });
  } catch (error) {
    console.log("Error in Update Category API:", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};

// DELETE CATEGORY
const deleteCatController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Please provide Category ID",
      });
    }
    
    const category = await categoryModel.findById(id);
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category Not Found",
      });
    }
    
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category Deleted Successfully",
      data: { categoryId: id },
    });
  } catch (error) {
    console.log("Error in Delete Category API:", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};

module.exports = {
  createCatController,
  getAllCatController,
  updateCatController,
  deleteCatController,
};
