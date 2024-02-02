import { IsString } from 'class-validator';

export class createTaskDto {
  @IsString()
  title: string;
}
