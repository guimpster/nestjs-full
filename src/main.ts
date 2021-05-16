import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import fastifyLogger from './config/logger/FastifyLoggerConfig';

async function startMicroservices(
  app: NestFastifyApplication,
  configService: ConfigService,
) {
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: configService.get('KAFKA_CLIENT_ID'),
        brokers: [configService.get('KAFKA_HOST')],
      },
    },
  });
  await app.startAllMicroservicesAsync();
}

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: fastifyLogger,
    }),
  );
  const configService = app.get(ConfigService);
  await startMicroservices(app, configService);
  await app.listen(
    +configService.get('API_PORT'),
    configService.get('API_HOST'),
  );
}
bootstrap();
