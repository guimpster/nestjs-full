import { Module, OnModuleInit, Logger } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

import { ElasticMessageRepository } from './elastic.message.repository';
import { ConfigService } from '../../config/config.service';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        node: configService.get('ELASTIC_HOST_DEV'),
        // maxRetries: 10,
        // requestTimeout: 10000,
        // pingTimeout: 10000,
        // sniffOnStart: true,
        // auth: {
        //  username: configService.get('ELASTICSEARCH_USERNAME'),
        //  password: configService.get('ELASTICSEARCH_PASSWORD'),
        // },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [ElasticMessageRepository],
  exports: [ElasticMessageRepository],
})
export class ElasticModule implements OnModuleInit {
  private readonly logger = new Logger(ElasticModule.name);

  constructor(private elasticMessageRepository: ElasticMessageRepository) {}

  onModuleInit() {
    this.logger.debug('Creating elasticsearch indices...');
    this.elasticMessageRepository.init().then();
  }
}
