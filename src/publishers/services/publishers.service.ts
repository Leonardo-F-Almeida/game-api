import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { PublishersPagination } from '../controllers/publishers.controller';
import CreatePublisherDto from '../dto/create-publisher.dto';
import UpdatePublisherDto from '../dto/update-publisher.dto';
import Publisher from '../entities/publisher.entity';

@Injectable()
export default class PublishersService {
  constructor(
    @InjectRepository(Publisher)
    private readonly publisherRepository: Repository<Publisher>,
  ) {}

  async create(createPublisherDto: CreatePublisherDto) {
    Logger.log('Creating a new publisher 🚀');
    const game = this.publisherRepository.create(createPublisherDto);
    await this.publisherRepository.save(game).catch((e: Error) => {
      throw new BadRequestException(e.message);
    });
    return this.findOne(game.id);
  }

  async findAll(query: PublishersPagination): Promise<{
    data: Publisher[];
    count: number;
  }> {
    Logger.log('Fetching publishers 🚀');
    const take = query.take || 10;
    const skip = query.skip || 0;
    const name = query.name || '';

    const [result, total] = await this.publisherRepository.findAndCount({
      where: { name: Like('%' + name + '%') },
      order: { name: 'DESC' },
      take: take,
      skip: skip,
    });

    return {
      data: result,
      count: total,
    };
  }

  async findOne(id: number) {
    Logger.log(`Fetching publisher with id ${id}`);
    return this.publisherRepository.findOneOrFail(id).catch((e: Error) => {
      throw new NotFoundException(e.message);
    });
  }

  async update(id: number, updatePublisherDto: UpdatePublisherDto) {
    Logger.log(`Updating publisher with id ${id}`);
    await this.publisherRepository.update(id, updatePublisherDto).catch(() => {
      throw new NotFoundException();
    });
    return this.findOne(id);
  }

  async remove(id: number) {
    Logger.log(`Removing publisher with id ${id}`);
    const deleted = await this.publisherRepository
      .delete(id)
      .catch((e: Error) => {
        throw new BadRequestException(e.message);
      });
    return { deleted };
  }
}
