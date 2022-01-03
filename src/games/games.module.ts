import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublishersModule } from '../publishers/publishers.module';
import GamesController from './controllers/games.controller';
import Game from './entities/game.entity';
import { ScheduleService } from './jobs/schedule.service';
import GamesService from './services/games.service';

@Module({
  imports: [TypeOrmModule.forFeature([Game]), PublishersModule],
  providers: [GamesService, ScheduleService],
  controllers: [GamesController],
})
export class GamesModule {}
