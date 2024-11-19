// section 1: importing modules and intializing
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");
const database = require("./config/dbConnect");
const cpachaRoutes = require("./routes/captchaRoute");
const razorpayRoutes = require("./routes/razorpayRoutes");


const port = process.env.PORT || 5000;

// section 2: adding middlewares especifically cors
app.use(bodyParser.json());
app.use(cors()); 


// section 3: making sure first database connect 
database()
  .then(() => {
    console.log("Connected to the database");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  });

// section 4: adding routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/captcha", cpachaRoutes);
app.use("/api/razorpay", razorpayRoutes);


app.use((req, res, next) => {
  res.status(404).json({ message: "Resource not found" });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});
