import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { IdpProviderRepository } from '../model/repositories/idp.provider.repository';

enum JwtPart {
  HEADER = 0,
  BODY = 1,
  SIG = 2,
}

function readJwtPart(jwt: string, part: JwtPart): unknown {
  const split = jwt.split('.');
  const unparsedPart = split[part];
  return JSON.parse(Buffer.from(unparsedPart, 'base64').toString('utf-8'));
}

type BasicJwtInfo = {
  iss?: string;
  sub?: string;
};

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private readonly logger = new Logger(AuthenticationGuard.name);

  constructor(private readonly providerRepository: IdpProviderRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessTokenHeader: string = request.headers.authorization;
    const jwt = accessTokenHeader.replace('Bearer ', '');

    const parsedJwtBody = readJwtPart(jwt, JwtPart.BODY) as BasicJwtInfo;
    if (!parsedJwtBody.iss) {
      this.logger.debug('cant find issuer on jwt');
      throw new UnauthorizedException();
    }
    const issuer = parsedJwtBody.iss;

    const provider = this.providerRepository.findByIssuer(issuer);
    if (!provider) {
      throw new UnauthorizedException();
    }

    return false;
  }
}
