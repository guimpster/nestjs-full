import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigService } from '../../config/config.service';
import { MysqlMessageRepository } from './mysql.message.repository';
import { Message } from 'src/repository/mysql/entities/message';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('MYSQL_HOST'),
        port: +config.get('MYSQL_PORT'),
        username: config.get('MYSQL_USER'),
        password: config.get('MYSQL_PASS'),
        database: config.get('MYSQL_DATABASE'),
        entities: [Message],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MysqlMessageRepository],
  exports: [MysqlMessageRepository],
})
export class MysqlModule {}
