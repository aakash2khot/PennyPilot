const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

const colors = require("colors");
const connectDb = async () => {
  try {
    // await mongoose.connect(process.env.MONGO_URL);
    await mongoose.connect("mongodb://ash:123@mongodb:27017/db");
    console.log(`Server Running On ${mongoose.connection.host}`.bgCyan.white);
  } catch (error) {
    console.log(`${error}`.bgRed);
  }
};

module.exports = connectDb;
