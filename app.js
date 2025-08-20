const express = require("express");
const app = express();
// Importing packages
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
// Importing routes
const auth = require("./routes/auth.js");
const creatures = require("./routes/creatures.js");
const user = require("./routes/user.js");
// Importing middleware
const cookieParser = require("cookie-parser");
const handdleError = require("./middleware/HandleError.js");

const dbUrl = process.env.DBURL;
const port = process.env.PORT || 5000;

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: "Too many requests, try again later.",
});

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

app.use(limiter);

app.use(auth);

app.use(creatures);

app.use(user);

app.use(handdleError);

mongoose
  .connect(dbUrl)
  .then((result) => {
    app.listen(port, () => {
      console.log(`✅ Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
