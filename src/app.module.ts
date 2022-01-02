import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Game from './games/entities/game.entity';
import { GamesModule } from './games/games.module';
import Publisher from './publishers/entities/publisher.entity';
import { PublishersModule } from './publishers/publishers.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: configService.get('DATABASE_TYPE'),
        url: configService.get('DATABASE_URL'),
        entities: [Game, Publisher],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Game, Publisher]),
    GamesModule,
    PublishersModule,
  ],
})
export class AppModule {}
