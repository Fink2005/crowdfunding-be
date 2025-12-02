import { User } from "@/domain/entities/User";

export interface GetUserByAddressUseCasePort {
  execute(address: string): Promise<User | null>;
}
