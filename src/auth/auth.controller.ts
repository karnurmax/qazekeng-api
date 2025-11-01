import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SendOtpDto, SendOtpResponseDto } from './dto/send-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { VerifyOtpResponseDto } from './dto/auth-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('send-otp')
  @ApiOperation({ summary: 'WhatsApp арқылы OTP код жіберу' })
  @ApiResponse({ status: 200, description: 'OTP код сәтті жіберілді', type: SendOtpResponseDto })
  async sendOtp(@Body() dto: SendOtpDto): Promise<SendOtpResponseDto> {
    return this.authService.sendOtp(dto);
  }

  @Post('verify-otp')
  @ApiOperation({ summary: 'OTP кодты тексеру және JWT токен алу' })
  @ApiResponse({ status: 200, description: 'Код сәтті тексерілді, JWT токен қайтарылды', type: VerifyOtpResponseDto })
  @ApiResponse({ status: 401, description: 'Жарамсыз OTP код' })
  async verifyOtp(@Body() dto: VerifyOtpDto): Promise<VerifyOtpResponseDto> {
    return this.authService.verifyOtp(dto);
  }
}

