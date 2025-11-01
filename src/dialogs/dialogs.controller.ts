import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { DialogsService } from './dialogs.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Dialogs')
@ApiBearerAuth('JWT-auth')
@Controller('dialogs')
@UseGuards(JwtAuthGuard)
export class DialogsController {
  constructor(private dialogsService: DialogsService) {}

  @Get()
  @ApiOperation({ summary: 'Пайдаланушының диалогтарын алу' })
  @ApiResponse({ status: 200, description: 'Диалогтар тізімі' })
  @ApiResponse({ status: 401, description: 'Жарамсыз токен' })
  async getDialogs(@Request() req: any) {
    const userId = req.user.userId;
    return this.dialogsService.getUserDialogs(userId);
  }
}

