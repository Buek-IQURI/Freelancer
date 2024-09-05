import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Folder } from './config/config.folder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // app.useGlobalInterceptors(new ResponseInterceptor());
  const config = app.get(ConfigService)
  const port = config.get('PORT');
  await app.listen(port);

  console.log(`Server running on port ${port}`);
}
Folder();
bootstrap();

