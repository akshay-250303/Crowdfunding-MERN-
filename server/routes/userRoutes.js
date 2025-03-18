const express = require("express");
const multer = require("multer");
const { registerUser,addCampaign,userViewOwnCampaign,userViewCampaignToDonate,userViewCampaign,addTransaction,userProfile,history, marquee } = require("../controllers/userController");

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = multer({ storage: storage });

// Define the registration route
router.post("/register", upload.fields([{ name: "profileImage" }, { name: "document" }]), registerUser);
router.post("/addcampaign", upload.fields([{ name: "image" }]), addCampaign);
router.get('/userViewOwnCampaign/:userId',userViewOwnCampaign );
router.get('/userViewCampaignToDonate',userViewCampaignToDonate );
router.get('/userViewCampaign/:campaignId',userViewCampaign );
router.post("/transactions", addTransaction);
router.get('/userProfile/:userId',userProfile );
router.get('/history/:userId',history );
router.get('/donors',marquee );


module.exports = router;
