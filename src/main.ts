import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'classroom',
        brokers: ['localhost:29092'],
      },
    },
  });
  app.startAllMicroservices().then(() => {
    console.log('[classroom] Microservice running!!!');
  });
  await app.listen(3333, () =>
    console.log('[classroom] HTTP server running!!!'),
  );
}
bootstrap();
