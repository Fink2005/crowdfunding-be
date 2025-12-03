import { GetCampaignMetadataByIdPort } from "@/application/ports/in/campaign/GetCampaignMetadataByIdPort";
import { CampaignRepositoryPort } from "@/application/ports/out/campaign/CampaignRepositoryPort";

export class GetCampaignMetadataByIdUseCase implements GetCampaignMetadataByIdPort {
  constructor(private campaignRepository: CampaignRepositoryPort) {}

  async execute(input: { id: string }) {
    const { id } = input;
    const campaign = await this.campaignRepository.getById(id);
    return campaign;
  }
}
