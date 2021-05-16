import { Module } from '@nestjs/common';
import { TriggerController } from './trigger.controller';
import { ElasticModule } from '../../repository/elasticsearch/elastic.module';
import { MessageService } from 'src/business/message/service/message.service';
import { MessageRepository } from 'src/business/message/repository/message.repository';
import { ElasticMessageRepository } from 'src/repository/elasticsearch/elastic.message.repository';

@Module({
  imports: [ElasticModule],
  providers: [
    MessageService,
    {
      provide: MessageRepository,
      useExisting: ElasticMessageRepository,
    },
  ],
  controllers: [TriggerController],
})
export class TriggerModule {}
