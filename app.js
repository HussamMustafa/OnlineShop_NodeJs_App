const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const homeRoute = require("./routes/home.route");
const errorMiddleware = require("./middlewares/error.middleware");

const DB_URL = "mongodb://localhost:27017/online-shop";
const port = 3000;

// Connect to DB first, then start the server
// Connect to MongoDB
mongoose.connect(DB_URL)
  .then(() => {
    console.log("Connected to database");

    // Global Middlewares
    app.use(express.static(path.join(__dirname, "assets")));
    app.use(express.static(path.join(__dirname, "images")));
    
    app.use(express.urlencoded({ extended: true }));

    // View Engine Setup
    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "views"));

    // Routes
    app.use("/", homeRoute);

    // Global Error Handler
    app.use(errorMiddleware);

    // Graceful Shutdown
    process.on('SIGINT', async () => {
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB due to app termination');
      process.exit(0);
    });

    // Start Server
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

