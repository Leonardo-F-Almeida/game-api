import { Test, TestingModule } from '@nestjs/testing';
import CreatePublisherDto from '../dto/create-publisher.dto';
import UpdatePublisherDto from '../dto/update-publisher.dto';
import { publisherMock } from '../mocks/publisher.mock';
import { publishersMock } from '../mocks/publishers.mock';

import PublishersService from '../services/publishers.service';
import PublishersController from './publishers.controller';

describe('PublishersController', () => {
  let controller: PublishersController;

  beforeEach(async () => {
    const publisherServiceProvider = {
      provide: PublishersService,
      useFactory: () => ({
        findAll: jest.fn().mockResolvedValue(publishersMock),
        findOne: jest.fn().mockImplementation((id: string) =>
          Promise.resolve({
            ...publisherMock,
            id,
          }),
        ),
        create: jest
          .fn()
          .mockImplementation((publisher: CreatePublisherDto) =>
            Promise.resolve({ id: 789, ...publisher }),
          ),
        update: jest
          .fn()
          .mockImplementation((id: number, publisher: UpdatePublisherDto) =>
            Promise.resolve({ id, ...publisher }),
          ),
        remove: jest.fn().mockResolvedValue({ deleted: true }),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublishersController],
      providers: [publisherServiceProvider],
    }).compile();

    controller = module.get<PublishersController>(PublishersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should get an array of publishers', async () => {
      await expect(
        controller.findAll({ skip: 0, take: 0, name: '' }),
      ).resolves.toEqual(publishersMock);
    });
  });

  describe('findOne', () => {
    it('should get a single publisher', async () => {
      await expect(controller.findOne(123)).resolves.toEqual({
        ...publisherMock,
        id: 123,
      });
    });
  });

  describe('create', () => {
    it('should create a new publisher', async () => {
      const newPublisher: CreatePublisherDto = {
        name: 'New Publisher 1',
        siret: 0,
        phone: '5522998787665',
      };
      await expect(controller.create(newPublisher)).resolves.toEqual({
        id: 789,
        ...newPublisher,
      });
    });
  });

  describe('update', () => {
    it('should update a  publisher', async () => {
      const updatedPublisher: UpdatePublisherDto = {
        name: 'Updated Publisher 1',
        siret: 0,
        phone: '5522998787665',
      };
      await expect(controller.update(789, updatedPublisher)).resolves.toEqual({
        id: 789,
        ...updatedPublisher,
      });
    });
  });

  describe('remove', () => {
    it('should return that it deleted a publisher', async () => {
      await expect(controller.remove(123)).resolves.toEqual({
        deleted: true,
      });
    });
  });
});
