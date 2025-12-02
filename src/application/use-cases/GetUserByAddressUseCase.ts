import { GetUserByAddressUseCasePort } from "@/application/ports/in/GetUserByAddressUseCasePort";
import { CampaignRepositoryPort } from "@/application/ports/out/CampaignRepositoryPort";
import { CampaignMetadata } from "@/domain/entities/CampaignMetadata";
import { User } from "@/domain/entities/User";
import { ConflictException } from "@/domain/exceptions/BaseException";
import { MongooseUserRepository } from "@/infrastructure/persistence/repositories/MongooseUserRepository";

export class GetUserByAddressUseCase implements GetUserByAddressUseCasePort {
  constructor(
    private readonly userRepository: MongooseUserRepository,
    private readonly campaignRepository: CampaignRepositoryPort
  ) {}

  async execute(address: string): Promise<(User & { campaigns: CampaignMetadata[] }) | null> {
    const user = await this.userRepository.findByAddress(address);
    if (!user) {
      throw new ConflictException("User not found");
    }

    const campaigns = await this.campaignRepository.getByCreator(address.toLowerCase());

    return {
      ...user,
      campaigns,
    };
  }
}
