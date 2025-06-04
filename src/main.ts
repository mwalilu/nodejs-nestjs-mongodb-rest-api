import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip non-whitelisted properties
      forbidNonWhitelisted: true, // Throw errors for non-whitelisted properties
      transform: true, // Automatically transform payloads to DTO instances
      transformOptions: {
      enableImplicitConversion: true, // Automatically convert string IDs to ObjectIds
    },
    })
  );

  //enable swagger reachable through http://localhost:3000/swagger and document at http://localhost:3000/swagger/json
   const config = new DocumentBuilder()
    .setTitle('Blog Example')
    .setDescription('The Blog API description')
    .setVersion('1.0')
    .addTag('blogs')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory,{jsonDocumentUrl: 'swagger/json'});

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
