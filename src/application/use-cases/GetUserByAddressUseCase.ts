import { GetUserByAddressUseCasePort } from "@/application/ports/in/GetUserByAddressUseCasePort";
import { User } from "@/domain/entities/User";
import { ConflictException } from "@/domain/exceptions/BaseException";
import { MongooseUserRepository } from "@/infrastructure/persistence/repositories/MongooseUserRepository";

export class GetUserByAddressUseCase implements GetUserByAddressUseCasePort {
  constructor(private readonly userRepository: MongooseUserRepository) {}

  async execute(address: string): Promise<User | null> {
    const user = await this.userRepository.findByAddress(address);
    if (!user) {
      throw new ConflictException("User not found");
    }
    return user;
  }
}
