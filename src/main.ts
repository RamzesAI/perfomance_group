import { DataSource } from 'typeorm';

import { NestFactory } from '@nestjs/core';

import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import { seed } from '#seed';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  swagger(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await seed(app.get(DataSource));

  app.enableCors({
    allowedHeaders: ['Authorization', 'Content-Type'],
    origin: '*',
  });

  await app.listen(3000, '0.0.0.0');

  function swagger(app) {
    const options = new DocumentBuilder()
      .setTitle('Perfomance Group')
      .setDescription('Perfomance Group API')
      .setExternalDoc('JSON Schema', './swagger-json')
      .addBearerAuth()
      .build();

    const customOptions: SwaggerCustomOptions = {
      swaggerOptions: {
        docExpansion: 'list',
      },
    };

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/swagger', app, document, customOptions);
  }
}
bootstrap();
