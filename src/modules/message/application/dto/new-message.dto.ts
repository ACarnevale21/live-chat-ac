import { IsNotEmpty, IsString } from 'class-validator';

export class NewMessageDto {
  @IsNotEmpty()
  @IsString()
  content: string;
}
