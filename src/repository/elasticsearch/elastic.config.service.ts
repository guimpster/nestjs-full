import { Injectable } from '@nestjs/common';
import {
  ElasticsearchOptionsFactory,
  ElasticsearchModuleOptions,
} from '@nestjs/elasticsearch';

import { ConfigService } from '../../config/config.service';

@Injectable()
export class ElasticsearchConfigService implements ElasticsearchOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createElasticsearchOptions(): ElasticsearchModuleOptions {
    return {
      node: this.configService.get('ELASTIC_HOST_DEV'),
      // maxRetries: 10,
      // requestTimeout: 10000,
      // pingTimeout: 10000,
      // sniffOnStart: true,
      // auth: {
      //  username: configService.get('ELASTICSEARCH_USERNAME'),
      //  password: configService.get('ELASTICSEARCH_PASSWORD'),
      // },
    };
  }
}
