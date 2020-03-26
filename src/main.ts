import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  app.setGlobalPrefix('v1');

  const options = new DocumentBuilder()
    .setTitle('PO UI')
    .setDescription('PO UI - Samples API')
    .setVersion('1.0')
    .setBasePath('/v1')
    .addTag('Samples')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useStaticAssets(join(__dirname, '..', 'public'));

  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
