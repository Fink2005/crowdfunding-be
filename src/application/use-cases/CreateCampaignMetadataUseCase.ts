import {
  CreateCampaignMetadataDto,
  CreateCampaignMetadataResponseDto,
} from "@/application/dto/CreateCampaignMetadataDto.js";
import { CampaignMetadataStorageServicePort } from "@/application/ports/out/CampaignMetadataStoragePort";
import { CampaignRepositoryPort } from "@/application/ports/out/CampaignRepositoryPort";
import { CampaignMetadata } from "@/domain/entities/CampaignMetadata.js";

export class CreateCampaignMetadataUseCase {
  constructor(
    private readonly metadataStorage: CampaignMetadataStorageServicePort,
    private readonly campaignRepository: CampaignRepositoryPort
  ) {}

  async execute(input: CreateCampaignMetadataDto): Promise<CreateCampaignMetadataResponseDto> {
    const { campaignId, title, description, imageUrl, creator } = input;
    const metadata: CampaignMetadata = {
      campaignId,
      title,
      description,
      imageUrl,
      creator,
    };

    const cid = await this.metadataStorage.saveMetadata(metadata);
    const ipfsUrl = `https://${cid}.ipfs.w3s.link`;

    await this.campaignRepository.create({
      campaignId,
      cid,
      ipfsUri: ipfsUrl,
      creator,
      title,
      description,
      imageUrl,
    });

    return { cid, ipfsUrl };
  }
}
