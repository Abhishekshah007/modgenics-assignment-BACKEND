const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");
const database = require("./config/dbConnect");
const cpachaRoutes = require("./routes/captchaRoute");
// const razorpayRoutes = require("./routes/razorpayRoutes");

const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000', 
  }));


// Database Connection
database()
  .then(() => {
    console.log("Connected to the database");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Exit the process if the database connection fails
  });

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/captcha", cpachaRoutes);
// app.use("/razorpay", razorpayRoutes);

// 404 Middleware for Undefined Routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Resource not found" });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});
