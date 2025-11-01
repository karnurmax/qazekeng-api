import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { TranslateService } from './translate.service';
import { TranslateDto } from './dto/translate.dto';
import { TranslateResponseDto } from './dto/translate-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Translate')
@ApiBearerAuth('JWT-auth')
@Controller('translate')
@UseGuards(JwtAuthGuard)
export class TranslateController {
  constructor(private translateService: TranslateService) {}

  @Post()
  @ApiOperation({ summary: 'Мәтінді OpenAI (gpt-4o) арқылы түзету' })
  @ApiResponse({ status: 200, description: 'Мәтін сәтті түзетілді', type: TranslateResponseDto })
  @ApiResponse({ status: 401, description: 'Жарамсыз токен' })
  async translate(@Body() dto: TranslateDto, @Request() req: any): Promise<TranslateResponseDto> {
    const userId = req.user.userId;
    return this.translateService.translate(dto.text, userId);
  }
}

