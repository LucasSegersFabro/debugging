import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrivateRoute } from './guard/private.route';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/user')
  @PrivateRoute()
  users(): { user_id: number; name: string }[] {
    return [{ user_id: 1, name: 'teste' }];
  }
}
