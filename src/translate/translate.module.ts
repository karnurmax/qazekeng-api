import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TranslateController } from './translate.controller';
import { TranslateService } from './translate.service';
import { Dialog } from '../entities/dialog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dialog])],
  controllers: [TranslateController],
  providers: [TranslateService],
})
export class TranslateModule {}

