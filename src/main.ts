import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { HttpFilter } from './common/filters/http.filter';
import { ConfigService } from './config/config.service';
import { AllExceptionsFilter } from './common/filters/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({}));
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpFilter());

  await app.listen(configService.getAppPort() || 3000);
}
bootstrap();
