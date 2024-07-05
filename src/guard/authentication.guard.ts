import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { IdpProviderRepository } from 'src/model/repositories/idp.provider.repository';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private readonly logger = new Logger(AuthenticationGuard.name);

  constructor(private readonly providerRepository: IdpProviderRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessTokenHeader: string = request.headers.authorization;
    // const provider = this.providerRepository.findByIssuer('test');
    return false;
  }
}
