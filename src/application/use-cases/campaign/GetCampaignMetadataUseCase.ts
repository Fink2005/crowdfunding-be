import { GetCampaignMetaDataDto } from "@/application/dto/GetCampaignMetadataDto";
import { GetCampaignMetadataPort } from "@/application/ports/in/campaign/GetCampaignMetadataPort";
import { CampaignRepositoryPort } from "@/application/ports/out/campaign/CampaignRepositoryPort";

export class GetCampaignMetadataUseCase implements GetCampaignMetadataPort {
  constructor(private campaignRepository: CampaignRepositoryPort) {}
  async execute(input: GetCampaignMetaDataDto) {
    const { page, limit } = input;
    if (page < 1 || limit < 1) {
      throw new Error("Invalid pagination parameters");
    }
    const skip = (page - 1) * limit;
    const result = await this.campaignRepository.get(skip, limit);
    return {
      campaigns: result.campaigns,
      currentPage: page,
      totalPages: result.totalPages,
    };
  }
}
