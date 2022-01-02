import { gameMock } from './game.mock';
import { publisherMock } from '../../publishers/mocks/publisher.mock';
import Game from '../entities/game.entity';

export const gamesMock: Game[] = [
  gameMock,
  {
    id: 2,
    price: 28,
    tags: ['Adventure'],
    title: 'Smart bots',
    releaseDate: new Date(),
    discountApplied: false,
    publisher: publisherMock,
    publisherId: publisherMock.id,
  },
];
