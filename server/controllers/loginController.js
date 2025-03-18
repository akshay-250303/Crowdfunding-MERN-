const User = require('../models/userReg');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }
      req.session.userId = user._id;
      req.session.userType = user.userType;
      req.session.userStatus = user.status;
  
      return res.status(200).json({
        message: "Login successful",
        userType: user.userType,
        userId: user._id, 
        userStatus: user.status
      });
      
      
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ message: "Server error during login" });
    }
  };