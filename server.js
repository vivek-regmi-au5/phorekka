require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

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

// Routes

app.use("/api/v1/user", require("./Routes/user"));
app.use("/api/v1/profile", require("./Routes/profile"));
app.use("/api/v1/address", require("./Routes/address"));
app.use("/api/v1/product", require("./Routes/product"));
app.use("/api/v1/crowdFund", require("./Routes/crowdFund"));
app.use("/api/v1/transaction", require("./Routes/transaction"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.log("error: ", err);
  res.send(err.message);
});

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Starting the server
const port = process.env.PORT || 9122;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
