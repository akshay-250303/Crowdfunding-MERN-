const User = require('../models/userReg');
const Campaign = require('../models/campaign')
const Transaction = require('../models/transaction')
const bcrypt = require("bcrypt");

//user reg
exports.registerUser = async (req, res) => {
    try {
        const { name, contact, email, password, status, userType } = req.body;
        const isTeacherExisted = await User.findOne({email});
        if(isTeacherExisted){
            return res.status(400).json({message:'user already exist'})
        }
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        const profileImage = req.files["profileImage"] ? req.files["profileImage"][0].path : "";
        const document = req.files["document"] ? req.files["document"][0].path : "";

        const newUser = new User({
            profileImage,
            name,
            contact,
            email,
            password: hashedPassword,
            document,
            status,
            userType
        });

        await newUser.save();
        res.status(200).json({ message: "User registered successfully. Wait for admin approval!" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

//user add campaign
exports.addCampaign = async (req, res) => {
    try {
        const { userid, title, description, date, amount, collected,accountName,accountNumber,ifsc,status } = req.body;

                const image = req.files["image"] ? req.files["image"][0].path : "";

        const newCampaign = new Campaign({
            userid,
            title,
            description,
            date,
            amount,
            collected,
            accountName,
            accountNumber,
            ifsc,
            status,
            image
        });

        await newCampaign.save();
        res.status(200).json({ message: "Campaign registered successfully. Wait for admin approval!" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

//user own campaign
exports.userViewOwnCampaign = async (req, res) => {
    const { userId } = req.params;

    try {
      const campaigns = await Campaign.find({userid:userId});
      return res.status(200).json(campaigns);
    } catch (error) {
      console.error("Error fetching campaign details:", error);
      return res.status(500).json({ message: "Error fetching campaigns" });
    }
  };

  //campaign for user home and main home
exports.userViewCampaignToDonate = async (req, res) => {

    try {
      const campaigns = await Campaign.find({status:'approved'});
      return res.status(200).json(campaigns);
    } catch (error) {
      console.error("Error fetching campaign details:", error);
      return res.status(500).json({ message: "Error fetching campaigns" });
    }
  };
// user viewing single campaign to donate
exports.userViewCampaign = async (req, res) => {
  try {
    const { campaignId } = req.params;
    const campaign = await Campaign.findById(campaignId);

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    res.status(200).json(campaign);
  } catch (error) {
    console.error("Error fetching campaign details:", error);
    res.status(500).json({ message: "Error fetching campaign details" });
  }
};

//user add transaction

exports.addTransaction = async (req, res) => {
  try {
    const { userId, campaignId, donorAmount, donorAccountName, donorAccountNumber, donorAccountifsc } = req.body;

    // ✅ Convert donorAmount to a number
    const amount = Number(donorAmount);

    // Validate donorAmount
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: "Invalid donation amount" });
    }

    // Create new transaction
    const newTransaction = new Transaction({
      userId,
      campaignId,
      donorAccountName,
      donorAccountNumber,
      donorAccountifsc,
      donorAmount: amount, // ✅ Ensure it's a number
    });

    await newTransaction.save();

    // ✅ Convert `collectedAmount` to a number before updating
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ error: "Campaign not found" });
    }

    const updatedCampaign = await Campaign.findByIdAndUpdate(
      campaignId,
      { $set: { collected: Number(campaign.collected) + amount } }, // ✅ Fix collectedAmount
      { new: true }
    );

    res.status(201).json({
      message: "Transaction successful and campaign updated",
      transaction: newTransaction,
      campaign: updatedCampaign,
    });
  } catch (error) {
    console.error("Transaction error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// user profile
exports.userProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Error fetching user details" });
  }
};

//transaction history
exports.history = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Populate campaign details (fetch campaignName instead of just campaignId)
    const history = await Transaction.find({ userId })
      .populate("campaignId", "title"); // 👈 This fetches the campaign name

    if (!history || history.length === 0) {
      return res.status(404).json({ message: "No transaction history found" });
    }

    res.status(200).json(history);
  } catch (error) {
    console.error("Error fetching Transaction details:", error);
    res.status(500).json({ message: "Error fetching Transaction details" });
  }
};

//marquee
exports.marquee = async (req, res) => {
  try {
    
    // Populate campaign details (fetch campaignName instead of just campaignId)
    const history = await Transaction.find()
      .populate("userId", "name"); 

    res.status(200).json(history);
  } catch (error) {
    console.error("Error fetching Transaction details:", error);
    res.status(500).json({ message: "Error fetching Transaction details" });
  }
};