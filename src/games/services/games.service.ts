import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Like, Repository } from 'typeorm';
import CreateGameDto from '../dto/create-game.dto';
import UpdateGameDto from '../dto/update-game.dto';
import Game from '../entities/game.entity';

import PublishersService from '../../publishers/services/publishers.service';

@Injectable()
export default class GamesService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
    private publisherService: PublishersService,
  ) {}

  async create(createGameDto: CreateGameDto) {
    Logger.log('Searching for the publisher');

    const publisher = await this.publisherService.findOne(
      createGameDto.publisherId,
    );

    if (!publisher) {
      throw new NotFoundException(
        'Publisher not found, please try to insert before create the game ',
      );
    }

    Logger.log('Creating the new game title 🚀');
    const game = this.gameRepository.create(createGameDto);

    await this.gameRepository.save(game).catch((e: Error) => {
      throw new BadRequestException(e.message);
    });

    return this.findOne(game.id);
  }

  async findAll(query): Promise<{
    data: Game[];
    count: number;
  }> {
    Logger.log('Fetching games 🚀');
    const take = query.take || 10;
    const skip = query.skip || 0;
    const title = query.title || '';

    const [result, total] = await this.gameRepository.findAndCount({
      where: { title: Like('%' + title + '%') },
      order: { title: 'DESC' },
      take: take,
      skip: skip,
    });

    return {
      data: result,
      count: total,
    };
  }

  async findOne(id: number) {
    return this.gameRepository
      .findOneOrFail(id, {
        select: ['id', 'title', 'price', 'tags', 'releaseDate'],
        relations: ['publisher'],
      })
      .catch(() => {
        throw new NotFoundException();
      });
  }

  async update(id: number, updateGameDto: UpdateGameDto) {
    await this.gameRepository.update(id, updateGameDto).catch(() => {
      throw new NotFoundException();
    });
    return this.findOne(id);
  }

  async remove(id: number) {
    const deleted = await this.gameRepository.delete(id).catch(() => {
      throw new NotFoundException();
    });
    return { deleted };
  }
}
