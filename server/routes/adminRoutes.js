const express = require('express')
const {adminViewUser,updateUserStatus,updateCampaignStatus,adminViewCampaign,deleteCampaign} = require('../controllers/adminController');

const router = express.Router();

router.get('/adminManageUser',adminViewUser);
router.put('/updateUserStatus/:userId', updateUserStatus);
router.get('/adminManageCampaign',adminViewCampaign);
router.put('/updateCampaignStatus/:campaignId', updateCampaignStatus);
router.delete('/deleteCampaign/:id', deleteCampaign);

module.exports = router;



