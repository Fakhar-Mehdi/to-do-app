import { IsString } from 'class-validator';
import mongoose from 'mongoose';

export class createTaskDto {
  @IsString()
  description: string;
  userId: mongoose.Types.ObjectId;
}
