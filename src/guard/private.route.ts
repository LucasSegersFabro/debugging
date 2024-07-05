import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthenticationGuard } from './authentication.guard';

export function PrivateRoute() {
  return applyDecorators(UseGuards(AuthenticationGuard));
}
