import { NestFactory } from '@nestjs/core';
import { TodoModule } from './todo/todo.module';
import { ValidationPipe } from '@nestjs/common';
import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';

async function bootstrap() {
  configDotenv();
  const port = process.env.PORT || 3000;
  const connectionString = process.env.DB_CONNECTION_STRING || '';
  const app = await NestFactory.create(TodoModule);
  app.useGlobalPipes(new ValidationPipe());
  await mongoose.connect(connectionString);
  await app.listen(port);
  console.log(`Connected to MongoDB.\nServer listening to port ${port}`);
}
bootstrap();
