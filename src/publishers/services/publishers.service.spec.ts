import Publisher from '../entities/publisher.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import PublishersService from './publishers.service';
import { publishersMock } from '../mocks/publishers.mock';
import { publisherMock } from '../mocks/publisher.mock';
import CreatePublisherDto from '../dto/create-publisher.dto';

describe('PublishersService', () => {
  let service: PublishersService;
  let repo: Repository<Publisher>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PublishersService,
        {
          provide: getRepositoryToken(Publisher),
          useValue: {
            findOneOrFail: jest.fn().mockResolvedValue(publisherMock),
            create: jest.fn().mockResolvedValue(publisherMock),
            save: jest.fn().mockResolvedValue(true),
            update: jest.fn().mockResolvedValue(true),
            delete: jest.fn().mockResolvedValue(true),
            findAndCount: jest
              .fn()
              .mockResolvedValue([publishersMock, publishersMock.length]),
          },
        },
      ],
    }).compile();

    service = module.get<PublishersService>(PublishersService);
    repo = module.get<Repository<Publisher>>(getRepositoryToken(Publisher));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('findOne', () => {
    it('should get a single publisher', () => {
      const repoSpy = jest.spyOn(repo, 'findOneOrFail');
      expect(service.findOne(123)).resolves.toEqual(publisherMock);
      expect(repoSpy).toBeCalledWith(123);
    });
  });
  describe('findAll', () => {
    it('should return an object with an array of publishers and count', async () => {
      const result = await service.findAll({});
      expect(result).toEqual({
        data: publishersMock,
        count: publishersMock.length,
      });
    });
  });
  describe('create', () => {
    it('should successfully insert a publisher', () => {
      const newPublisher: CreatePublisherDto = {
        name: 'New Publisher 1',
        siret: 0,
        phone: '5522998787665',
      };
      expect(service.create(newPublisher)).resolves.toEqual(publisherMock);
      expect(repo.create).toBeCalledTimes(1);
      expect(repo.create).toBeCalledWith(newPublisher);
    });
  });
  describe('update', () => {
    it('should call the update method', async () => {
      const updatedPublisher: CreatePublisherDto = {
        name: 'New Publisher 1',
        siret: 0,
        phone: '5522998787665',
      };
      const updPublisher = await service.update(789, updatedPublisher);
      expect(updPublisher).toEqual(publisherMock);
      expect(repo.update).toBeCalledTimes(1);
      expect(repo.update).toBeCalledWith(789, updatedPublisher);
    });
  });
  describe('remove', () => {
    it('should return {deleted: true}', () => {
      expect(service.remove(123)).resolves.toEqual({ deleted: true });
    });
  });
});
