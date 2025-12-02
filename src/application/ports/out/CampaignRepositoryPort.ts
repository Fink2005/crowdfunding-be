import { CampaignMetadata } from "@/domain/entities/CampaignMetadata";

export interface CampaignRepositoryPort {
  create(campaign: CampaignMetadata): Promise<CampaignMetadata>;
  get(
    skip: number,
    limit: number
  ): Promise<{
    campaigns: CampaignMetadata[];
    totalPages: number;
  }>;
  getById(id: string): Promise<CampaignMetadata | null>;
  getByCreator(creator: string): Promise<CampaignMetadata[]>;
}
