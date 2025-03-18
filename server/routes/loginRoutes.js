const express = require("express");
const { login } = require("../controllers/loginController");

const router = express.Router();


// Define the registration route
router.post("/login", login);


module.exports = router;
