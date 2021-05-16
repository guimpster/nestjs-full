import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateMessageDto } from 'src/business/message/dto/create-message.dto';
import { MessageService } from 'src/business/message/service/message.service';
import { Message } from './schema/message.schema';

@Resolver('Message')
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Query('message')
  async message(
    @Args('id')
    id: string,
  ): Promise<Message> {
    return this.messageService.findOne(id);
  }

  @Mutation('createMessage')
  async createMessage(
    @Args('createMessageInput') args: CreateMessageDto,
  ): Promise<Message> {
    return this.messageService.create(args);
  }
}
