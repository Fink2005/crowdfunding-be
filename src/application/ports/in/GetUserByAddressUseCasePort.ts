import { CampaignMetadata } from "@/domain/entities/CampaignMetadata";
import { User } from "@/domain/entities/User";

export interface GetUserByAddressUseCasePort {
  execute(address: string): Promise<(User & { campaigns: CampaignMetadata[] }) | null>;
}
