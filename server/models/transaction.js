const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    userId: { type: String, required: true, ref: "User" },
    campaignId: { type: String, required: true, ref: "Campaign" },
    donorAccountName: { type: String, required: true},
    donorAccountNumber: { type: String, required: true },
    donorAccountifsc: { type: String, required: true },
    donorAmount: { type: Number, required: true },

}, { timestamps: true });

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
