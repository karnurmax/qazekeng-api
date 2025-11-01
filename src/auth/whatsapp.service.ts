import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WhatsAppService {
  private readonly apiUrl: string;

  constructor() {
    this.apiUrl = process.env.WHATSAPP_API_URL || '';
    if (!this.apiUrl) {
      console.warn('WHATSAPP_API_URL is not set');
    }
  }

  async sendMessage(phone: string, message: string): Promise<{ success: boolean; error?: string }> {
    try {
      await axios.post(`${this.apiUrl}/send`, {
        phone,
        message,
      });
      return { success: true };
    } catch (error) {
      console.error('WhatsApp API error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      // Тест кезеңінде қате қайтару
      return { success: false, error: errorMessage };
    }
  }
}

