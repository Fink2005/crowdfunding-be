import { CreateCampaignMetadataDto } from "@/application/dto/CreateCampaignMetadataDto";
import { CampaignMetadata } from "@/domain/entities/CampaignMetadata";

export interface CreateCampaignMetadataPort {
  execute(input: CreateCampaignMetadataDto): Promise<CampaignMetadata>;
}
