import { GetCampaignMetadataByIdPort } from "@/application/ports/in/GetCampaignMetadataByIdPort";
import { CampaignRepositoryPort } from "@/application/ports/out/CampaignRepositoryPort";

export class GetCampaignMetadataByIdUseCase implements GetCampaignMetadataByIdPort {
  constructor(private campaignRepository: CampaignRepositoryPort) {}

  async execute(input: { id: string }) {
    const { id } = input;
    const campaign = await this.campaignRepository.getById(id);
    return campaign;
  }
}
