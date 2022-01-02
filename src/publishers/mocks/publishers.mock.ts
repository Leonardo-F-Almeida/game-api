import Publisher from '../entities/publisher.entity';
import { publisherMock } from './publisher.mock';

export const publishersMock: Publisher[] = [
  publisherMock,
  {
    id: 2,
    name: 'Metaverse Games S/A',
    siret: 559988,
    phone: '22997196883',
    games: [],
  },
];
