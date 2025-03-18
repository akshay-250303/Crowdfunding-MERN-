const User = require('../models/userReg')
const Campaign = require('../models/campaign')


// manage user 
exports.adminViewUser = async (req, res) => {
    try {
      const users = await User.find({userType:'user'});
      return res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching user details:", error);
      return res.status(500).json({ message: "Error fetching users" });
    }
  };

//manage user status
exports.updateUserStatus = async (req, res) => {
  const { userId } = req.params;
  const { status } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { status },
      { new: true } // Return updated user
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User status updated", user: updatedUser });
  } catch (error) {
    console.error("Error updating user status:", error);
    res.status(500).json({ message: "Server error while updating user status" });
  }
};


//manage campaign
exports.adminViewCampaign = async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    return res.status(200).json(campaigns);
  } catch (error) {
    console.error("Error fetching campaign details:", error);
    return res.status(500).json({ message: "Error fetching campaigns" });
  }
};


//manage campaign status
exports.updateCampaignStatus = async (req, res) => {
  const { campaignId } = req.params; // Ensure correct parameter name
  const { status } = req.body;

  try {
    const updatedCampaign = await Campaign.findByIdAndUpdate(
      campaignId, // Match with the correct variable name
      { status },
      { new: true } // Return the updated campaign
    );

    if (!updatedCampaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    res.status(200).json({ message: "Campaign status updated", campaign: updatedCampaign });
  } catch (error) {
    console.error("Error updating campaign status:", error.message);
    res.status(500).json({ message: "Server error while updating campaign status", error: error.message });
  }
};

exports.deleteCampaign = async (req, res) => {
  try {
      const { id } = req.params;

      // Check if campaign exists
      const campaign = await Campaign.findById(id);
      if (!campaign) {
          return res.status(404).json({ message: 'Campaign not found' });
      }

      // Delete campaign
      await Campaign.findByIdAndDelete(id);

      res.status(200).json({ message: 'Campaign deleted successfully' });
  } catch (error) {
      console.error('Error deleting campaign:', error);
      res.status(500).json({ message: 'Server error' });
  }
};

