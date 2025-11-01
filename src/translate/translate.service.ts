import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import OpenAI from 'openai';
import { Dialog } from '../entities/dialog.entity';
import { TranslateDto } from './dto/translate.dto';

@Injectable()
export class TranslateService {
  private openai: OpenAI;

  constructor(
    @InjectRepository(Dialog)
    private dialogRepository: Repository<Dialog>,
  ) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async translate(text: string, userId: string) {
    const prompt = `You are an English teacher.
The user writes in English mixed with Kazakh.
Fix the grammar, explain the changes in English, and give 1-2 examples.
Respond strictly in JSON with fields:
{ corrected, explanation, examples }

Text: """${text}"""
`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
    });

    // Response-тан мәліметтерді алу
    const usage = response.usage;
    const content = response.choices[0]?.message?.content;

    if (!content) {
      throw new Error('Empty response from OpenAI');
    }

    // JSON парсинг
    const parsed = JSON.parse(content);
    const corrected = parsed.corrected || text;
    const explanation = parsed.explanation || '';
    const examples = parsed.examples || [];

    // Cost-ті response ішінен алу
    // OpenAI API response-інде тікелей total_cost жоқ, сондықтан есептейміз
    // GPT-4o бағалары: Input $0.03/1K tokens, Output $0.06/1K tokens
    let cost = 0;
    if (usage) {
      const inputCost = (usage.prompt_tokens / 1000) * 0.03;
      const outputCost = (usage.completion_tokens / 1000) * 0.06;
      cost = inputCost + outputCost;
    }

    // Dialog-ты DB-ге сақтау
    const dialog = this.dialogRepository.create({
      userId,
      textInput: text,
      textCorrected: corrected,
      explanation,
      examples,
      openaiModel: 'gpt-4o',
      openaiPromptTokens: usage?.prompt_tokens || 0,
      openaiCompletionTokens: usage?.completion_tokens || 0,
      openaiTotalTokens: usage?.total_tokens || 0,
      openaiCostUsd: cost,
    });

    const savedDialog = await this.dialogRepository.save(dialog);

    return {
      corrected,
      explanation,
      examples,
      openai_cost_usd: parseFloat(savedDialog.openaiCostUsd.toString()),
    };
  }
}

