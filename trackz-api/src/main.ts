import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // IMPORTE O ValidationPipe


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // ATIVE O ValidationPipe PARA VALIDAR DADOS DE ENTRADA
  app.enableCors({
  origin: 'http://localhost:3001', // ou '*', se for para dev
});
  await app.listen(3002);
}
bootstrap();