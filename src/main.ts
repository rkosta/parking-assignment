import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ErrorInterceptor } from './interceptors/error-interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ErrorInterceptor());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Booking API')
    .setDescription(
      'The Booking API is the result of Deskbird assignemnt. It is a RESTful API that allows users to book spots and manage their bookings. It also allows users to manage their spots.',
    )
    .setVersion('1.0')
    .addTag('bookings')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
