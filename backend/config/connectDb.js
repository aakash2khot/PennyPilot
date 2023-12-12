

const colors = require("colors");
const connectDb = async () => {
  try {
    const mongoose = require("mongoose");
    mongoose.set('strictQuery', false);
    // await mongoose.connect(process.env.MONGO_URL);
    await mongoose.connect("mongodb://mongo:27017/expenseApp");
    // await mongoose.connect("mongodb+srv://ash:123@cluster0.eioachd.mongodb.net/expenseApp")
    console.log(`Server Running On mongo --  ${mongoose.connection.host}`.bgCyan.white);
  } catch (error) {
    console.log(`${error}`.bgRed);
    console.log("not connectd to mongoose")
  }
};

module.exports = connectDb;
