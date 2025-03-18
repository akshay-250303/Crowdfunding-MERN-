require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const userRoutes = require("./routes/userRoutes");
const loginRoutes = require("./routes/loginRoutes");
const adminroutes = require("./routes/adminRoutes");

const app = express();

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

const PORT = 5000;
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // If you're using cookies or authentication
  })
);

app.use(express.json()); // ✅ This is required to parse JSON data
app.use(express.urlencoded({ extended: true })); // (Optional for form submissions)


mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
    .catch(error => console.log("MongoDB Connection Error:", error));

app.use("/uploads", express.static("uploads"));
app.use("/api/users", userRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/admin",adminroutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
