import { CreateCampaignMetadataDto } from "@/application/dto/campaign/CreateCampaignMetadataDto";
import { CreateCampaignMetadataPort } from "@/application/ports/in/campaign/CreateCampaignMetadataPort";
import { CampaignMetadataStorageServicePort } from "@/application/ports/out/campaign/CampaignMetadataStoragePort";
import { CampaignRepositoryPort } from "@/application/ports/out/campaign/CampaignRepositoryPort";
import { UserRepositoryPort } from "@/application/ports/out/user/UserRepositoryPort";
import { CampaignMetadata } from "@/domain/entities/CampaignMetadata.js";

export class CreateCampaignMetadataUseCase implements CreateCampaignMetadataPort {
  constructor(
    private readonly metadataStorage: CampaignMetadataStorageServicePort,
    private readonly campaignRepository: CampaignRepositoryPort,
    private readonly userRepository: UserRepositoryPort
  ) {}

  async execute(input: CreateCampaignMetadataDto): Promise<CampaignMetadata> {
    const { campaignId, title, description, imageUrl, creator } = input;
    const metadata: CampaignMetadata = {
      campaignId,
      title,
      description,
      imageUrl,
      creator,
    };
    const userExist = await this.userRepository.findByAddress(creator);

    if (!userExist) {
      await this.userRepository.create({ address: creator });
    }

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

    return metadata;
  }
}
