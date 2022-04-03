import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';


import { MessageService } from 'src/business/message/service/message.service';
import { MessageRepository } from 'src/business/message/repository/message.repository';
import { MysqlMessageRepository } from 'src/repository/mysql/mysql.message.repository';
import { MysqlModule } from 'src/repository/mysql/mysql.module';
import { MessageResolver } from './message.resolver';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    MysqlModule,
    CommonModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      include: [MessageModule],
      typePaths: ['src/api/message/schema/*.graphql'],
      installSubscriptionHandlers: false,
    }),
  ],
  providers: [
    MessageResolver,
    MessageService,
    {
      provide: MessageRepository,
      useExisting: MysqlMessageRepository,
    },
  ],
  controllers: [],
})
export class MessageModule {}
