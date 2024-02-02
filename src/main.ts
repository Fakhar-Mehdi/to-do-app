import { NestFactory } from '@nestjs/core';
import { TodoModule } from './todo/todo.module';
import { ValidationPipe } from '@nestjs/common';
import mongoose from 'mongoose';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(TodoModule);
  app.useGlobalPipes(new ValidationPipe());
  await mongoose.connect('mongodb://localhost:27017');
  await app.listen(port);
  console.log(`Connected to MongoDB.\nServer listening to port ${port}`);
}
bootstrap();
