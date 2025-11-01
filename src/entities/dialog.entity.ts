import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from './user.entity';

@Entity('dialogs')
export class Dialog {
  @PrimaryColumn('uuid')
  id: string;

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ type: 'text', name: 'text_input' })
  textInput: string;

  @Column({ type: 'text', name: 'text_corrected' })
  textCorrected: string;

  @Column({ type: 'text' })
  explanation: string;

  @Column({ type: 'jsonb', default: '[]' })
  examples: string[];

  @Column({ name: 'openai_model' })
  openaiModel: string;

  @Column({ name: 'openai_prompt_tokens' })
  openaiPromptTokens: number;

  @Column({ name: 'openai_completion_tokens' })
  openaiCompletionTokens: number;

  @Column({ name: 'openai_total_tokens' })
  openaiTotalTokens: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 6,
    name: 'openai_cost_usd',
  })
  openaiCostUsd: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.dialogs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}

