const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();
const app = express();
app.use(express.json());
const userRoute = require("./routes/user.js");
const authRoute = require("./routes/auth.js");

mongoose
  .connect(process.env.MONGO__URL)
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

app.use("/api/v1", userRoute);
app.use("/api/auth", authRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("runn in 5000");
});
