import { Schema, model } from "mongoose";

const ContributionSchema = new Schema({
  campaignId: Number,
  contributor: String,
  amount: String,
  txHash: String,
  timestamp: Number,
});

export const ContributionModel = model("Contribution", ContributionSchema);
