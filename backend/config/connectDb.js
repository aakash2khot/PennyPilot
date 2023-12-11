const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

const colors = require("colors");
const connectDb = async () => {
  try {
    // await mongoose.connect(process.env.MONGO_URL);
    await mongoose.connect("mongodb://localhost:27017/PennyPilot");
    // await mongoose.connect("mongodb+srv://ash:123@cluster0.eioachd.mongodb.net/expenseApp")
    console.log(`Server Running On ${mongoose.connection.host}`.bgCyan.white);
  } catch (error) {
    console.log(`${error}`.bgRed);
    console.log("not connectd to mongoose")
  }
};

module.exports = connectDb;
