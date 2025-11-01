import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyOtpDto {
  @ApiProperty({ description: 'Телефон нөмірі', example: '+77001234567' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ description: '6-цифрлық OTP код', example: '123456' })
  @IsString()
  @IsNotEmpty()
  code: string;
}

