const userModel = require("../models/userModel");
const logger = require('../logger');
// login callback
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });
    if (!user) {
      logger.warn("User Not Found");
      return res.status(404).send("User Not Found");
    }
    logger.info("User Found - Login Successful");
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    logger.error(error);
    res.status(400).json({
      success: false,
      error,
    });
  }
};

//Register Callback
const registerController = async (req, res) => {
  try {
    const newUser = new userModel(req.body);
    await newUser.save();
    logger.info("Successfully Registered");
    res.status(201).json({
      success: true,
      newUser,
    });
  } catch (error) {
    logger.error(error);
    res.status(400).json({
      success: false,
      error,
    });
  }
};

module.exports = { loginController, registerController };
