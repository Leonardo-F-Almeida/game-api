import { publisherMock } from '../../publishers/mocks/publisher.mock';
import Game from '../entities/game.entity';

export const gameMock: Game = {
  id: 1,
  price: 60,
  tags: ['Racing'],
  title: 'MetaCarts',
  releaseDate: new Date(),
  publisher: publisherMock,
  discountApplied: false,
  publisherId: publisherMock.id,
};
