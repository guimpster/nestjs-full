import { Injectable, Logger } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

import { MessageRepository } from '../../business/message/repository/message.repository';
import { ConfigService } from '../../config/config.service';
import { Message } from '../../business/message/entities/message.entity';

@Injectable()
export class ElasticMessageRepository extends MessageRepository {
  private readonly logger = new Logger(ElasticMessageRepository.name);

  constructor(
    private readonly esService: ElasticsearchService,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  public async init() {
    this.logger.debug(
      `Creating index ${this.configService.get('ELASTIC_MESSAGE_INDEX')}`,
    );
    await this.esService.indices.create(
      {
        index: this.configService.get('ELASTIC_MESSAGE_INDEX'),
        body: {
          mappings: {
            properties: {
              num_cliente: { type: 'long' },
              cpf_cliente: { type: 'keyword' },
              status: { type: 'keyword' },
              source: { type: 'keyword' },
              criada_em: { type: 'date' },
            },
          },
        },
      },
      { ignore: [400] },
    );
    this.logger.debug(
      `Index ${this.configService.get(
        'ELASTIC_MESSAGE_INDEX',
      )} created/updated`,
    );
  }

  public async create(message: Message): Promise<Message> {
    const body = {
      cpf_cliente: message.cpf_cliente,
      num_cliente: message.num_cliente,
      status: 'CREATED',
      source: 'DEMO',
      criada_em: new Date(),
    };
    const esMessage = await this.esService.index({
      index: this.configService.get('ELASTIC_MESSAGE_INDEX'),
      body,
    });
    return new Message({
      ...body,
      id: esMessage.body._id,
    });
  }

  public async getById(id: string): Promise<Message> {
    const { body } = await this.esService.get(
      {
        index: this.configService.get('ELASTIC_MESSAGE_INDEX'),
        id,
      },
      { ignore: [404] },
    );
    return new Message({
      ...body._source,
      id: body._id,
    });
  }
}
