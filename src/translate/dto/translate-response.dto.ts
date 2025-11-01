import { ApiProperty } from '@nestjs/swagger';

export class TranslateResponseDto {
  @ApiProperty({
    description: 'Түзетілген мәтін',
    example: 'Today I went to the shop and it was great.',
  })
  corrected: string;

  @ApiProperty({
    description: 'Түзетулер түсіндірмесі',
    example: 'Fixed tense and word order.',
  })
  explanation: string;

  @ApiProperty({
    description: 'Мысал сөйлемдер',
    example: ['I went to the store yesterday.'],
    type: [String],
  })
  examples: string[];

  @ApiProperty({
    description: 'OpenAI құны (USD)',
    example: 0.00025,
  })
  openai_cost_usd: number;
}

