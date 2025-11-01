import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TranslateDto {
  @ApiProperty({
    description: 'Түзетілуге тиіс мәтін (ағылшынша немесе ағылшынша+қазақша аралас)',
    example: 'Today me go shop, жақсы болды.',
  })
  @IsString()
  @IsNotEmpty()
  text: string;
}

