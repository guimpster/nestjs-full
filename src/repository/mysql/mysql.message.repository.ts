import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { classToClass } from 'class-transformer';

import { MessageRepository } from '../../business/message/repository/message.repository';
import { Message } from '../../business/message/entities/message.entity';
import { Message as MysqlMessage } from './entities/message';

@Injectable()
export class MysqlMessageRepository extends MessageRepository {
  private readonly logger = new Logger(MysqlMessageRepository.name);

  constructor(
    @InjectRepository(MysqlMessage)
    private readonly messageMysqlRepository: Repository<MysqlMessage>,
  ) {
    super();
  }

  public async create(message: Message): Promise<Message> {
    const rawMessage = {
      cpf_cliente: message.cpf_cliente,
      num_cliente: message.num_cliente,
      status: 'CREATED',
      source: 'DEMO',
      criada_em: new Date(),
    };
    const mysqlMessage = await this.messageMysqlRepository.save(
      new MysqlMessage({
        ...rawMessage,
      }),
    );
    return new Message({
      ...mysqlMessage,
      id: '' + mysqlMessage.id,
    });
  }

  public async getById(id: string): Promise<Message> {
    const mysqlMessage = await this.messageMysqlRepository.findOne({
      where: [{ id: id }],
    });
    return new Message({
      ...mysqlMessage,
      id,
    });
  }
}
