import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { IdpProviderRepository } from '../model/repositories/idp.provider.repository';
import { UserRepository } from '../model/repositories/user.repository';
import { JwtPart, readJwtPart } from '../utils';

type BasicJwtInfo = {
  iss?: string;
  sub?: string;
};

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private readonly logger = new Logger(AuthenticationGuard.name);

  constructor(
    private readonly providerRepository: IdpProviderRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessTokenHeader: string = request.headers.authorization;
    const jwt = accessTokenHeader.replace('Bearer ', '');

    const parsedJwtBody = readJwtPart(jwt, JwtPart.BODY) as BasicJwtInfo;
    if (!parsedJwtBody.iss || !parsedJwtBody.sub) {
      this.logger.debug('cant find issuer or sub on jwt');
      throw new UnauthorizedException();
    }
    const issuer = parsedJwtBody.iss;

    const provider = this.providerRepository.findByIssuer(issuer);
    if (!provider) {
      throw new UnauthorizedException();
    }

    provider.validateJwt(jwt);

    const providerUser = this.providerRepository.findUserByIdAndProvider(
      parsedJwtBody.sub,
      provider.id,
    );

    if (!providerUser) {
      throw new UnauthorizedException();
    }

    const user = this.userRepository.findUserById(providerUser.user_id);
    if (!user) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
