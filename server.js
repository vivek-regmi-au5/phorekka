require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://vivek:${process.env.MONGODB_PASSWORD}@cluster0-va8yu.mongodb.net/phorekka?retryWrites=true&w=majority
  `,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  },
  () => {
    console.log("Connected to mongodb database phorekka");
  }
);

const app = express();
app.use(cors());

// Middlewares
app.use(express.json());
// app.use(morgan("dev"));

// Routes
app.use("/api/v1/user", require("./Routes/user"));
app.use("/api/v1/profile", require("./Routes/profile"));
app.use("/api/v1/address", require("./Routes/address"));
app.use("/api/v1/product", require("./Routes/product"));
// app.use(function (err, req, res, next) {
//   console.log(err);
//   res.status(500);
//   res.send("No routes found.");
// });

// Starting the server
const port = process.env.PORT || 9122;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
