import { gameMock } from './../mocks/game.mock';
import { Test, TestingModule } from '@nestjs/testing';
import GamesService from '../services/games.service';
import GamesController from './games.controller';
import CreateGameDto from '../dto/create-game.dto';
import UpdateGameDto from '../dto/update-game.dto';
import { gamesMock } from '../mocks/games.mock';

describe('GamesController', () => {
  let controller: GamesController;

  beforeEach(async () => {
    const gamesServiceProvider = {
      provide: GamesService,
      useFactory: () => ({
        findAll: jest.fn().mockResolvedValue(gamesMock),
        findOne: jest.fn().mockImplementation((id: string) =>
          Promise.resolve({
            ...gameMock,
            id,
          }),
        ),
        create: jest
          .fn()
          .mockImplementation((game: CreateGameDto) =>
            Promise.resolve({ id: 789, ...game }),
          ),
        update: jest
          .fn()
          .mockImplementation((id: number, game: UpdateGameDto) =>
            Promise.resolve({ id, ...game }),
          ),
        remove: jest.fn().mockResolvedValue({ deleted: true }),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [GamesController],
      providers: [gamesServiceProvider],
    }).compile();

    controller = module.get<GamesController>(GamesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should get an array of games', async () => {
      await expect(
        controller.findAll({ skip: 0, take: 0, title: '' }),
      ).resolves.toEqual(gamesMock);
    });
  });

  describe('findOne', () => {
    it('should get a single fame', async () => {
      await expect(controller.findOne(123)).resolves.toEqual({
        ...gameMock,
        id: 123,
      });
    });
  });

  describe('create', () => {
    it('should create a new game', async () => {
      const newPublisher: CreateGameDto = gameMock;
      await expect(controller.create(newPublisher)).resolves.toEqual({
        id: 789,
        ...newPublisher,
      });
    });
  });

  describe('update', () => {
    it('should update a game', async () => {
      const updatedPublisher: UpdateGameDto = gameMock;
      await expect(controller.update(789, updatedPublisher)).resolves.toEqual({
        id: 789,
        ...updatedPublisher,
      });
    });
  });

  describe('remove', () => {
    it('should return that it deleted a game', async () => {
      await expect(controller.remove(123)).resolves.toEqual({
        deleted: true,
      });
    });
  });
});
