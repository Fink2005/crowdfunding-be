import { User } from "@/domain/entities/User.js";

export interface UserRepositoryPort {
  create(user: User): Promise<User>;
  delete(id: string): Promise<void>;
  findByAddress(address: string): Promise<User | null>;
  updateChatId(address: string, chatId: string): Promise<void>;
}
