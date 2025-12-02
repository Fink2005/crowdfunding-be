import { CampaignMetadata } from "@/domain/entities/CampaignMetadata";

export interface CampaignRepositoryPort {
  create(campaign: CampaignMetadata): Promise<CampaignMetadata>;
  get(
    skip: number,
    limit: number
  ): Promise<{
    campaigns: CampaignMetadata[];
    total: number;
  }>;
  getById(id: string): Promise<CampaignMetadata | null>;
}
