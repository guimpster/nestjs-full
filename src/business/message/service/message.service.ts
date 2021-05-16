import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from '../dto/create-message.dto';
import { Message } from '../entities/message.entity';
import { MessageRepository } from '../repository/message.repository';

@Injectable()
export class MessageService {
  constructor(private readonly messageRepository: MessageRepository) {}

  async create(createMessageDto: CreateMessageDto) {
    return this.messageRepository.create(
      new Message({
        num_cliente: createMessageDto.num_cliente,
        cpf_cliente: createMessageDto.cpf_cliente,
      }),
    );
  }

  async findOne(id: string) {
    return this.messageRepository.getById(id);
  }
}
