import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../entities/user.entity';
import { Dialog } from '../entities/dialog.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const isDevelopment = process.env.NODE_ENV !== 'production';
        return {
          type: 'postgres',
          url: configService.get<string>('DATABASE_URL'),
          entities: [User, Dialog],
          synchronize: true, // Development-те true, production-де false
          logging: isDevelopment,
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, Dialog]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule { }

