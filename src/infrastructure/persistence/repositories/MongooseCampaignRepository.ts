import { CampaignMetadata } from "@/domain/entities/CampaignMetadata";
import { CampaignModel } from "@/infrastructure/persistence/models/CampaignModel";

export class MongooseCampaignRepository {
  async create(campaign: CampaignMetadata) {
    return await CampaignModel.create(campaign);
  }
  async get(
    skip: number,
    limit: number
  ): Promise<{
    campaigns: CampaignMetadata[];
    total: number;
  }> {
    const campaigns = await CampaignModel.find().skip(skip).limit(limit).lean();
    const total = await CampaignModel.countDocuments();
    return {
      campaigns,
      total,
    };
  }

  async getById(id: string): Promise<CampaignMetadata | null> {
    const campaign = await CampaignModel.findById(id).lean();
    return campaign;
  }
}
