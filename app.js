const express = require("express");
const app = express();
// Importing packages
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
// Importing routes
const auth = require("./routes/auth.js");
const creatures = require("./routes/creatures.js");
const user = require("./routes/user.js");
// Importing middleware
const cookieParser = require("cookie-parser");
const handdleError = require("./middleware/HandleError.js");

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

app.use(auth);
app.use(creatures);
app.use(user);

// Handle errors
//! This should be the last middleware
app.use(handdleError);

mongoose
  .connect(
    "mongodb+srv://MyPc:tHyXYPXT9XRvZsat@cluster0.ltbuhuz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((result) => {
    app.listen(5000, () => {
      console.log("✅ Server running on port 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
