import {
  Body,
  Controller,
  Inject,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
  Post,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { OrchestratorDto } from './dto/orchestrator.dto';

@Controller('orchestrator-client')
export class OrchestratorKafkaClientController
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(OrchestratorKafkaClientController.name);

  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.kafkaClient.subscribeToResponseOf('orchestrator.message');
    await this.kafkaClient.connect();
  }

  async onModuleDestroy() {
    await this.kafkaClient.close();
  }

  @Post('event')
  async sendKafkaEvent(@Body() data: OrchestratorDto) {
    await this.kafkaClient
      .emit('orchestrator.event', {
        headers: {
          toPartition: data.key,
        },
        key: data.key,
        value: data,
      })
      .toPromise();
  }

  @Post('message')
  async sendKafkaMessage(@Body() data: OrchestratorDto) {
    return this.kafkaClient
      .send('orchestrator.message', {
        headers: {
          toPartition: data.key,
        },
        key: data.key,
        value: data,
      })
      .toPromise();
  }
}
