const mongoose = require("mongoose");
const logger = require('../logger');
mongoose.set('strictQuery', false);

const colors = require("colors");
const connectDb = async () => {
  try {
    const URL = process.env.NODE_ENV === 'test' ? process.env.MONGO_TEST_URL : process.env.MONGO_URL;
    await mongoose.connect(URL);
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
