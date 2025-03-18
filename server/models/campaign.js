const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true},
    date: { type: String, required: true },
    amount: { type: String, required: true},
    collected: { type:Number, default: 0},
    accountName: { type: String, required: true},
    accountNumber: { type: String, required: true},
    ifsc: { type: String, required: true},
    image: String,
    status: { type: String, default: "processing" },


}, { timestamps: true });

const Campaign = mongoose.model("Campaign", campaignSchema);
module.exports = Campaign;



