import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TranslateModule } from './translate/translate.module';
import { DialogsModule } from './dialogs/dialogs.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    TranslateModule,
    DialogsModule,
  ],
})
export class AppModule {}

