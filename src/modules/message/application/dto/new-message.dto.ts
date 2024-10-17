import { IsNotEmpty, IsString } from 'class-validator';

export class NewMessageDto {
  @IsNotEmpty()
  @IsString()
  user: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
