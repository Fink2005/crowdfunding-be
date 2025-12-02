import { CampaignMetadata } from "@/domain/entities/CampaignMetadata";
import mongoose from "mongoose";

const CampaignSchema = new mongoose.Schema<CampaignMetadata>(
  {
    campaignId: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    creator: { type: String, required: true },
    ipfsUri: { type: String, required: true },
    cid: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const CampaignModel = mongoose.model<CampaignMetadata>("Campaign", CampaignSchema);
