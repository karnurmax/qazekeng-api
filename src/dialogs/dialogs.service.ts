import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dialog } from '../entities/dialog.entity';

@Injectable()
export class DialogsService {
  constructor(
    @InjectRepository(Dialog)
    private dialogRepository: Repository<Dialog>,
  ) {}

  async getUserDialogs(userId: string) {
    const dialogs = await this.dialogRepository.find({
      where: {
        userId,
      },
      order: {
        createdAt: 'DESC',
      },
      select: [
        'id',
        'textInput',
        'textCorrected',
        'explanation',
        'examples',
        'openaiModel',
        'openaiPromptTokens',
        'openaiCompletionTokens',
        'openaiTotalTokens',
        'openaiCostUsd',
        'createdAt',
      ],
    });

    return dialogs.map((dialog) => ({
      id: dialog.id,
      textInput: dialog.textInput,
      textCorrected: dialog.textCorrected,
      explanation: dialog.explanation,
      examples: dialog.examples,
      openaiModel: dialog.openaiModel,
      openaiPromptTokens: dialog.openaiPromptTokens,
      openaiCompletionTokens: dialog.openaiCompletionTokens,
      openaiTotalTokens: dialog.openaiTotalTokens,
      openaiCostUsd: parseFloat(dialog.openaiCostUsd.toString()),
      createdAt: dialog.createdAt,
    }));
  }
}

