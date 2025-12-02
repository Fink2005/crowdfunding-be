import {
  CreateCampaignMetadataDto,
  CreateCampaignMetadataResponseDto,
} from "@/application/dto/CreateCampaignMetadataDto.js";
import { CampaignMetadataStorageServicePort } from "@/application/ports/out/CampaignMetadataStoragePort";
import { CampaignMetadata } from "@/domain/entities/CampaignMetadata.js";

export class CreateCampaignMetadataUseCase {
  constructor(private readonly metadataStorage: CampaignMetadataStorageServicePort) {}

  async execute(input: CreateCampaignMetadataDto): Promise<CreateCampaignMetadataResponseDto> {
    const metadata: CampaignMetadata = {
      title: input.title,
      description: input.description,
      imageUrl: input.imageUrl,
      creator: input.creator,
      campaignId: input.campaignId,
    };

    const cid = await this.metadataStorage.saveMetadata(metadata);
    const ipfsUrl = `https://${cid}.ipfs.w3s.link`;

    return { cid, ipfsUrl };
  }
}
