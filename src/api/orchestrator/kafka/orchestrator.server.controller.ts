import { Controller, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { OrchestratorDto } from './dto/orchestrator.dto';

@Controller('orchestrator-kafka-server')
export class OrchestratorKafkaServerController {
  private readonly logger = new Logger(OrchestratorKafkaServerController.name);

  @EventPattern('orchestrator.event')
  receiveKafkaEvent(params: { value: OrchestratorDto }) {
    const sum = (params.value.numbers || []).reduce((a, b) => a + b);
    this.logger.log(`Total sum: ${sum}`);
  }

  @MessagePattern('orchestrator.message')
  receiveKafkaMessage(params: { value: OrchestratorDto }) {
    const sum = (params.value.numbers || []).reduce((a, b) => a + b);
    this.logger.log(`Total sum: ${sum}`);
    return sum;
  }
}
