import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import {
  TEST_USER_EMAIL,
  TEST_USER_PASSWORD,
} from './model/repositories/user.repository';
import { AppModule } from './app.module';

describe('AppController', () => {
  let appController: AppController;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    appController = module.get<AppController>(AppController);

    app = await module.createNestApplication();
    await app.init();
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  it.only('logins successfuly and calls a protected route', async () => {
    console.log('AAA');

    const login = await request(app.getHttpServer())
      .post('/login')
      .send({
        user: TEST_USER_EMAIL,
        password: TEST_USER_PASSWORD,
      })
      .expect(200);

    const jwt = login.body.access_token;

    return request(app.getHttpServer())
      .get('/user')
      .set({ Authorization: `Bearer ${jwt}` })
      .expect(200);
  });
});
