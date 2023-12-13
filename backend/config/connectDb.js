const mongoose = require("mongoose");
const logger = require('../logger');
mongoose.set('strictQuery', false);

const colors = require("colors");
const connectDb = async () => {
  try {
    // await mongoose.connect(process.env.MONGO_URL);
    await mongoose.connect("mongodb://mongo:27017/expenseApp");
    // await mongoose.connect("mongodb+srv://ash:123@cluster0.eioachd.mongodb.net/expenseApp");
    console.log(`Server Running On mongo --  ${mongoose.connection.host}`.bgCyan.white);
    logger.info("Connected to Mongo Database");
  } catch (error) {
    logger.error(error);
    console.log(`${error}`.bgRed);
    console.log("Connecting to Mongo Database Failed")
  }
};

module.exports = connectDb;
