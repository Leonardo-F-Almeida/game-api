import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { gameMock } from 'src/games/mocks/game.mock';

import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('App (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('PublisherModule', () => {
    // small script to remove all database entries for cat between tests
    beforeEach(async () => {
      const uncleared = await request(app.getHttpServer()).get('/publishers');

      await Promise.all(
        uncleared.body.data.map(async (pub) => {
          return request(app.getHttpServer()).delete(`/publishers/${pub.id}`);
        }),
      );
    });

    it('Post publisher, get all, get by id, delete', async () => {
      const firstPublisher = {
        name: 'LeoSoftware2',
        siret: 123456,
        phone: '+5522997196883',
      };
      const data = await request(app.getHttpServer())
        .post('/publishers')
        .send(firstPublisher)
        .expect(201);
      expect(data.body).toEqual({
        ...firstPublisher,
        id: expect.any(Number),
      });

      const publishers = await request(app.getHttpServer())
        .get('/publishers')
        .expect(200);
      expect(publishers.body.data).toEqual(expect.any(Array));
      expect(publishers.body.count).toBe(1);
      expect(publishers.body.data[0]).toEqual({
        ...firstPublisher,
        id: expect.any(Number),
      });
      const secPublisher = await request(app.getHttpServer())
        .get(`/publishers/${data.body.id}`)
        .expect(200);
      expect(secPublisher.body).toEqual(data.body);
      return request(app.getHttpServer())
        .delete(`/publishers/${data.body.id}`)
        .expect(200);
    });

    it('Post publisher, get by name, update, get by id, delete', async () => {
      const firstPublisher = {
        name: 'LeoSoftware2',
        siret: 123456,
        phone: '+5522997196883',
      };
      const data = await request(app.getHttpServer())
        .post('/publishers')
        .send(firstPublisher)
        .expect(201);
      expect(data.body).toEqual({
        ...firstPublisher,
        id: expect.any(Number),
      });
      const createdPublisher = await request(app.getHttpServer())
        .get('/publishers/?name=Leo')
        .expect(200);
      expect(createdPublisher.body.data[0]).toEqual({
        ...firstPublisher,
        id: expect.any(Number),
      });
      const updPublisher = await request(app.getHttpServer())
        .patch(`/publishers/${data.body.id}`)
        .send({
          id: data.body.id,
          siret: 543,
        })
        .expect(200);
      expect(updPublisher.body).toEqual({ ...data.body, siret: 543 });
      const updatedCat = await request(app.getHttpServer())
        .get(`/publishers/${data.body.id}`)
        .expect(200);
      expect(updatedCat.body).toEqual(updPublisher.body);
      return request(app.getHttpServer())
        .delete(`/publishers/${data.body.id}`)
        .expect(200);
    });
  });

  describe('GamesModule', () => {
    // small script to remove all database entries for cat between tests
    beforeEach(async () => {
      const uncleared = await request(app.getHttpServer()).get('/games');

      await Promise.all(
        uncleared.body.data.map(async (game) => {
          return request(app.getHttpServer()).delete(`/games/${game.id}`);
        }),
      );
    });

    it('Post game, get all, get by id, delete', async () => {
      const firstPublisher = {
        name: 'LeoSoftware2',
        siret: 123456,
        phone: '+5522997196883',
      };

      const publisherData = await request(app.getHttpServer())
        .post('/publishers')
        .send(firstPublisher)
        .expect(201);
      expect(publisherData.body).toEqual({
        ...firstPublisher,
        id: expect.any(Number),
      });

      const firstGame = {
        title: 'First Game',
        price: 100,
        tags: ['adventure'],
        releaseDate: '2020-08-01',
      };

      const gameData = await request(app.getHttpServer())
        .post('/games')
        .send({ ...firstGame, publisherId: publisherData.body.id })
        .expect(201);

      expect(gameData.body).toEqual({
        ...firstGame,
        price: expect.any(String),
        publisher: { ...firstPublisher, id: expect.any(Number) },
        id: expect.any(Number),
      });

      const games = await request(app.getHttpServer())
        .get('/games')
        .expect(200);
      expect(games.body.data).toEqual(expect.any(Array));
      expect(games.body.count).toBe(1);
      expect(games.body.data[0]).toEqual({
        ...firstGame,
        price: expect.any(String),
        discountApplied: false,
        publisherId: publisherData.body.id,
        id: expect.any(Number),
      });
      const secPublisher = await request(app.getHttpServer())
        .get(`/games/${games.body.data[0].id}`)
        .expect(200);
      expect(secPublisher.body).toEqual({
        ...firstGame,
        price: expect.any(String),
        publisher: { ...firstPublisher, id: expect.any(Number) },
        id: expect.any(Number),
      });
      return request(app.getHttpServer())
        .delete(`/games/${secPublisher.body.id}`)
        .expect(200);
    });

    it('Post game, get by name, update, get by id, delete', async () => {
      const firstPublisher = {
        name: 'LeoSoftware2',
        siret: 123456,
        phone: '+5522997196883',
      };

      const publisherData = await request(app.getHttpServer())
        .post('/publishers')
        .send(firstPublisher)
        .expect(201);
      expect(publisherData.body).toEqual({
        ...firstPublisher,
        id: expect.any(Number),
      });

      const firstGame = {
        title: 'First Game',
        price: 100,
        tags: ['adventure'],
        releaseDate: '2020-08-01',
      };

      const gameData = await request(app.getHttpServer())
        .post('/games')
        .send({ ...firstGame, publisherId: publisherData.body.id })
        .expect(201);

      expect(gameData.body).toEqual({
        ...firstGame,
        price: expect.any(String),
        publisher: { ...firstPublisher, id: expect.any(Number) },
        id: expect.any(Number),
      });
      const game = await request(app.getHttpServer())
        .get('/games?title=First')
        .expect(200);
      expect(game.body.data[0]).toEqual({
        ...firstGame,
        discountApplied: false,
        price: expect.any(String),
        publisherId: publisherData.body.id,
        id: expect.any(Number),
      });
      const updGame = await request(app.getHttpServer())
        .patch(`/games/${game.body.data[0].id}`)
        .send({
          title: 'Name changed',
        })
        .expect(200);
      expect(updGame.body.title).toEqual('Name changed');
      const updatedCat = await request(app.getHttpServer())
        .get(`/games/${game.body.data[0].id}`)
        .expect(200);
      expect(updatedCat.body.title).toEqual('Name changed');
      return request(app.getHttpServer())
        .delete(`/games/${game.body.data[0].id}`)
        .expect(200);
    });
  });
});
