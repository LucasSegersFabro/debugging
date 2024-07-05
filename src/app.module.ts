import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdpProviderRepository } from './model/repositories/idp.provider.repository';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, IdpProviderRepository],
})
export class AppModule {}
