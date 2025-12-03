import { GetCampaignMetaDataDto } from "@/application/dto/GetCampaignMetadataDto";
import { CampaignMetadata } from "@/domain/entities/CampaignMetadata";

export interface GetCampaignMetadataPort {
  execute(input: GetCampaignMetaDataDto): Promise<{
    campaigns: CampaignMetadata[];
    currentPage: number;
    totalPages: number;
  }>;
}
