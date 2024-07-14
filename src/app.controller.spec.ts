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
      expect(appController.getHello()).toEqual(
        expect.objectContaining({ hello: 'world' }),
      );
    });
  });

  it('logins successfuly and calls a protected route', async () => {
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

  it('also accepts external provider jwts (fixed token)', async () => {
    const jwt =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6InBiX1RLUlhWSlktMjd2SUdfQTgxUE1ILWNkWSJ9.eyJ2ZXIiOiIyLjAiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vOTE4ODA0MGQtNmM2Ny00YzViLWIxMTItMzZhMzA0YjY2ZGFkL3YyLjAiLCJzdWIiOiJBQUFBQUFBQUFBQUFBQUFBQUFBQUFNbmx2aGdPcERwNlJ6MVdEbmRRc0VBIiwiYXVkIjoiOThmMTk5OTMtNzUzZS00ZWFlLWE3NTgtOTk1MzdhMDU0YmU5IiwiZXhwIjoxNzIxMDgwNTcyLCJpYXQiOjE3MjA5OTM4NzIsIm5iZiI6MTcyMDk5Mzg3MiwiZW1haWwiOiJsdWNhcy5zZWdlcnMwNEBnbWFpbC5jb20iLCJ0aWQiOiI5MTg4MDQwZC02YzY3LTRjNWItYjExMi0zNmEzMDRiNjZkYWQiLCJub25jZSI6IjYzYjBkZTFhLWJkZjItNGRlYy1iOTU2LThiMWNhZmUzYTY3MyIsImFpbyI6IkR2UiF3cjVYU1YqMmV6aFhGcmJ1bjN5KnFUc0VSNThQckZtZ3p4UDJLc0phS3Z3SEVsZDd6U21NZE52Y2piSFJtYmdIM1Jrbng3d05sbG16U00xcjNxa2lPOWZBSWJQITQyNTJzVWgzVTAzcVQ4eW0yVkl0aldyeGJUeHQ2cnozT21iWUNrMmg4b2xhSUFxWjAqcEJsS2oyYUNLYU0hWDZVYVljSnA0anN4bjFTSEt3M2E3aU5sSk1RSzc5S3QqWTJBJCQifQ.M2EGAcIAvhKaZJyObHsJcJewqmwgiB2FI-FmFOdU-XF7NXvcT_b950fxW1pBVcVy6VS3PVtLd21U-Etk1-CABl3HI-0N75E235SVLj6yQQA5PwvsBSPnJYLNJJzwgt5gKr1nUQZaylsCebNIft_Dta7qr_0iEtNBY9fCaEf53gGRRaENh0gZ5dTNU8wDWEn8ALX6gI4Fphp-gwBZcHXSHzoa169ugaxIWdFc62KMwKbN9S_7FhwznFMqTgzxX8AbQ6BrsPavndsPowjgg5oUCmS1tvLCztT_DJTiMe9KXy9jBP3OuY8eOHF7Z4g5m1pZwwjGEKNZIqurX-SgGZ-gHQ';

    return request(app.getHttpServer())
      .get('/user')
      .set({ Authorization: `Bearer ${jwt}` })
      .expect(200);
  });

  it.todo('accepts external provider jwts');
});
