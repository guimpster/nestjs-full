import { Message } from '../entities/message.entity';

export abstract class MessageRepository {
  abstract create(message: Message): Promise<Message>;
  abstract getById(id: string): Promise<Message | Record<string, unknown>>;
}
