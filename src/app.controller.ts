import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { PrivateRoute } from './guard/private.route';
import { UserDomain } from './model/user.domain';

type LoginRequest = {
  user: string;
  password: string;
};

type LoginResponse = {
  access_token: string;
  provider_id: number;
};

@Controller()
export class AppController {
  constructor(private readonly userDomain: UserDomain) {}

  @Get()
  getHello(): { hello: string } {
    return {
      hello: 'world',
    };
  }

  @Get('/user')
  @PrivateRoute()
  users(): { user_id: number; name: string }[] {
    return [{ user_id: 1, name: 'teste' }];
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginRequest: LoginRequest): Promise<LoginResponse> {
    const { access_token } = await this.userDomain.loginWithDefaultProvider(
      loginRequest.user,
      loginRequest.password,
    );

    return {
      access_token,
      provider_id: 1,
    };
  }
}
