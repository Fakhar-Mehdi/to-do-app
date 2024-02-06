import { IsString, ValidateIf } from 'class-validator';
import mongoose from 'mongoose';

export class UpdateUserDto {
  @ValidateIf((object, value) => value !== undefined)
  @IsString()
  username?: string | null | undefined;

  @ValidateIf((object, value) => value !== undefined)
  @IsString()
  password?: string | null | undefined;

  @IsString()
  userId: mongoose.Types.ObjectId;
}
