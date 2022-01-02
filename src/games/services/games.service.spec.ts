import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import GamesService from './games.service';
import Game from '../entities/game.entity';
import { gamesMock } from '../mocks/games.mock';
import { gameMock } from '../mocks/game.mock';
import CreateGameDto from '../dto/create-game.dto';
import PublishersService from '../../publishers/services/publishers.service';
import { publisherMock } from '../../publishers/mocks/publisher.mock';

describe('GamesService', () => {
  let service: GamesService;
  let repo: Repository<Game>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GamesService,
        {
          provide: getRepositoryToken(Game),
          useValue: {
            findOneOrFail: jest.fn().mockResolvedValue(gameMock),
            create: jest.fn().mockResolvedValue(gameMock),
            save: jest.fn().mockResolvedValue(true),
            update: jest.fn().mockResolvedValue(true),
            delete: jest.fn().mockResolvedValue(true),
            findAndCount: jest
              .fn()
              .mockResolvedValue([gamesMock, gamesMock.length]),
          },
        },
        {
          provide: PublishersService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(publisherMock),
          },
        },
      ],
    }).compile();

    service = module.get<GamesService>(GamesService);
    repo = module.get<Repository<Game>>(getRepositoryToken(Game));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('findOne', () => {
    it('should get a single game', () => {
      expect(service.findOne(123)).resolves.toEqual(gameMock);
    });
  });
  describe('findAll', () => {
    it('should return an object with an array of games and count', async () => {
      const result = await service.findAll({ skip: 0, take: 10, title: '' });
      expect(result).toEqual({
        data: gamesMock,
        count: gamesMock.length,
      });
    });
  });
  describe('create', () => {
    it('should successfully insert a game', async () => {
      const newGame: CreateGameDto = gameMock;
      const resp = await service.create(newGame);
      expect(resp).toEqual(gameMock);
      expect(repo.create).toBeCalledTimes(1);
      expect(repo.create).toBeCalledWith(newGame);
    });
  });
  describe('update', () => {
    it('should call the update method', async () => {
      const updatedGame: CreateGameDto = gameMock;
      const updGame = await service.update(789, updatedGame);
      expect(updGame).toEqual(gameMock);
      expect(repo.update).toBeCalledTimes(1);
      expect(repo.update).toBeCalledWith(789, updatedGame);
    });
  });
  describe('remove', () => {
    it('should return {deleted: true}', () => {
      expect(service.remove(123)).resolves.toEqual({ deleted: true });
    });
  });
});
