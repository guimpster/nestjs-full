import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { ConfigService } from 'src/config/config.service';
import { ElasticModule } from '../../repository/elasticsearch/elastic.module';
import { OrchestratorKafkaClientController } from './kafka/orchestrator.client.controller';
import { OrchestratorKafkaServerController } from './kafka/orchestrator.server.controller';
// import { OrchestratorSQSController } from './orchestrator.sqs.controller';

@Module({
  imports: [
    ElasticModule,
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              // clientId: configService.get('KAFKA_CLIENT_ID'),
              brokers: [configService.get('KAFKA_HOST')],
            },
            consumer: {
              groupId: configService.get('orchestrator-node-group'),
              allowAutoTopicCreation: true,
            },
            run: {
              partitionsConsumedConcurrently: 1,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [],
  controllers: [
    OrchestratorKafkaClientController,
    OrchestratorKafkaServerController,
  ],
})
export class OrchestratorModule {}
