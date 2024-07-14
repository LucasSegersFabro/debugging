import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { IdpProviderRepository } from './model/repositories/idp.provider.repository';
import { UserRepository } from './model/repositories/user.repository';
import { UserDomain } from './model/user.domain';
import { AuthenticationGuard } from './guard/authentication.guard';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AuthenticationGuard,
    IdpProviderRepository,
    UserRepository,
    UserDomain,
  ],
})
export class AppModule {}
