import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { WhatsAppService } from './whatsapp.service';

@Injectable()
export class AuthService {
  private otpStore: Map<string, string> = new Map();

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private whatsappService: WhatsAppService,
  ) {}

  async sendOtp(dto: SendOtpDto) {
    // 6-цифрлық код генерациялау
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // In-memory сақтау (expire жоқ)
    this.otpStore.set(dto.phone, code);

    // WhatsApp API-ге жіберу
    const whatsappResult = await this.whatsappService.sendMessage(dto.phone, `Your OTP code: ${code}`);

    // Тест кезеңінде қате болса да OTP кодты response-қа қосамыз
    return {
      success: whatsappResult.success,
      code: whatsappResult.success ? undefined : code, // Қате болса кодты қайтарамыз
      error: whatsappResult.error,
    };
  }

  async verifyOtp(dto: VerifyOtpDto) {
    const storedCode = this.otpStore.get(dto.phone);

    if (!storedCode || storedCode !== dto.code) {
      throw new UnauthorizedException('Invalid OTP code');
    }

    // Кодты тазалау
    this.otpStore.delete(dto.phone);

    // User табу немесе құру
    let user = await this.userRepository.findOne({
      where: { phone: dto.phone },
    });

    if (!user) {
      user = this.userRepository.create({ phone: dto.phone });
      user = await this.userRepository.save(user);
    }

    // JWT токен генерациялау
    const token = this.jwtService.sign({
      sub: user.id,
      phone: user.phone,
    });

    return {
      token,
      user: {
        id: user.id,
        phone: user.phone,
      },
    };
  }
}

