import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendOtpDto {
  @ApiProperty({ description: 'Телефон нөмірі', example: '+77001234567' })
  @IsString()
  @IsNotEmpty()
  phone: string;
}

export class SendOtpResponseDto {
  @ApiProperty({ description: 'Операция нәтижесі', example: true })
  success: boolean;

  @ApiProperty({ 
    description: 'OTP код (тек тест кезеңінде, WhatsApp қате қайтарғанда)', 
    example: '123456',
    required: false,
  })
  code?: string;

  @ApiProperty({ 
    description: 'WhatsApp API қатесі (егер болса)', 
    example: 'Network error',
    required: false,
  })
  error?: string;
}

