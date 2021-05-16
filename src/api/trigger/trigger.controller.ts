import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MessageService } from '../../business/message/service/message.service';
import { CreateMessageDto } from '../../business/message/dto/create-message.dto';

@Controller('trigger')
export class TriggerController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.messageService.findOne(id);
  }
}
