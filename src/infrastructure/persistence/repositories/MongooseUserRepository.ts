import { UserRepositoryPort } from "@/application/ports/out/user/UserRepositoryPort";
import { User } from "@/domain/entities/User";
import { UserModel } from "@/infrastructure/persistence/models/UserModel";

export class MongooseUserRepository implements UserRepositoryPort {
  async create(user: User): Promise<User> {
    const created = await UserModel.create(user);
    return {
      id: created._id.toString(),
      address: created.address,
      chatId: created.chatId,
      createdAt: created.createdAt,
    };
  }

  async findByAddress(address: string): Promise<User | null> {
    const user = await UserModel.findOne({ address }).exec();
    if (!user) return null;

    return {
      id: user._id.toString(),
      address: user.address,
      chatId: user.chatId,
      createdAt: user.createdAt,
    };
  }

  async updateChatId(address: string, chatId: string): Promise<void> {
    await UserModel.findOneAndUpdate({ address }, { chatId }, { upsert: true, new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await UserModel.findByIdAndDelete(id).exec();
  }
}
