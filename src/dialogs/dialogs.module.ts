import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DialogsController } from './dialogs.controller';
import { DialogsService } from './dialogs.service';
import { Dialog } from '../entities/dialog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dialog])],
  controllers: [DialogsController],
  providers: [DialogsService],
})
export class DialogsModule {}

