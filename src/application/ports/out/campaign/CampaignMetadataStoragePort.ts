import { CampaignMetadata } from "@/domain/entities/CampaignMetadata.js";

export interface CampaignMetadataStorageServicePort {
  saveMetadata(metadata: CampaignMetadata): Promise<string>;
}
