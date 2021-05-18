const express = require("express");
const fileUpload = require("express-fileupload");
const userRoutes = require("./routes/userRoute");
const db = require("./Database/setup");

require("dotenv").config();

const app = express();

app.use(fileUpload());
app.use(express.json());

app.use("/", userRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, function () {
  console.log(`server started at ${PORT}`);
});
