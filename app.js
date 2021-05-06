const express = require("express");

require("dotenv").config();

const app = express();

const db = require("./Database/setup");

app.use(express.json());

const userRoutes = require("./routes/userRoute");

app.use("/", userRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, function () {
  console.log(`server started at ${PORT}`);
});
