import { Injectable } from '@nestjs/common';
import { User } from '../user';

export const TEST_USER_EMAIL = 'test@test.com.br';
export const TEST_USER_PASSWORD = 'some weak password $';

@Injectable()
export class UserRepository {
  private store: User[] = [
    new User({
      email: TEST_USER_EMAIL,
      name: 'Test',
      id: 1,
      password: TEST_USER_PASSWORD,
    }),
  ];

  public findByMailAndPassword(email: string, password: string) {
    return this.store.find((s) => s.email === email && s.password === password);
  }
}
