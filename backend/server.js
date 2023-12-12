const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const path = require("path");
const connectDb = require("./config/connectDb");
const logger = require('./logger');
// config dot env file
dotenv.config();

//databse call
connectDb();
console.log("hi");
//rest object
const app = express();

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// routes
// user routes
app.use("/api/v1/users", require("./routes/userRoute"));
//transections routes
app.use("/api/v1/transections", require("./routes/transectionRoutes"));

// static files
// app.use(express.static(path.join(__dirname, "../frontend/build")));

// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
// });

//port
const PORT = 8082 || process.env.PORT;

//listen server
app.listen(PORT, () => {
  // console.log(`Server running on port ${PORT}`);
  logger.info("Server is running on port " + PORT);
});
