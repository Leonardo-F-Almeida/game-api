import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import Game from '../entities/game.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name);
  /**
   * Unit in months
   * Ex: remove games older than 18 months
   */
  private readonly REMOVE_GAMES_OLDER_THAN = 18;
  private readonly DISCOUNT_TO_APPLY = 0.2; // 20%

  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async removeOldGames() {
    this.logger.debug('Running process to remove old games...');
    const date = dayjs()
      .subtract(this.REMOVE_GAMES_OLDER_THAN, 'month')
      .toISOString();

    const operation = this.gameRepository
      .createQueryBuilder()
      .delete()
      .where('releaseDate < :date', { date });

    await operation.execute().catch((e) => this.logger.error(e.message));
    this.logger.debug('Games older than 18 months removed');
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async applyDiscountToOldGames() {
    this.logger.debug('Running process to apply dicounts to old games...');
    const initial_date = dayjs().subtract(18, 'month').toISOString();
    const final_date = dayjs().subtract(12, 'month').toISOString();

    const games = await this.gameRepository
      .createQueryBuilder()
      .where('Game.releaseDate >= :initial_date', { initial_date })
      .andWhere('Game.releaseDate < :final_date', { final_date })
      .andWhere('Game.discountApplied = false')
      .getMany();

    const promiseList = [];
    games.forEach((game) => {
      const newPrice = game.price - game.price * this.DISCOUNT_TO_APPLY;
      game.price = newPrice;
      game.discountApplied = true;
      promiseList.push(this.gameRepository.update(game.id, game));
    });

    Promise.all(promiseList).catch((e) => this.logger.error(e.message));

    this.logger.debug(`Discounts applied in ${games.length} game(s)`);
  }
}
