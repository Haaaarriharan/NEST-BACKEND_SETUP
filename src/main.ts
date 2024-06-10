import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: '*',
  });
  const config = new DocumentBuilder()
    .setTitle('Golden-Sales')
    .setDescription('The Golden-Carat API description')
    .setVersion('1.0')
    .addTag('Golden-Sales')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3007);
}
bootstrap();
