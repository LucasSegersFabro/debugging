import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { IdpProviderRepository } from './repositories/idp.provider.repository';

const DEFAULT_ISSUER = 'https://this.service.com';

@Injectable()
export class UserDomain {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly idpRepository: IdpProviderRepository,
  ) {}

  loginWithDefaultProvider(
    email: string,
    password: string,
  ): { access_token: string } {
    const user = this.userRepository.findByMailAndPassword(email, password);
    const defaultProvider = this.idpRepository.findByIssuer(DEFAULT_ISSUER);

    if (!user) {
      throw new UnauthorizedException();
    }

    const jwtBody = {
      sub: user.id.toString(),
      iss: defaultProvider.issuer,
    };

    const jwt = defaultProvider.signJwt(jwtBody);

    return { access_token: jwt };
  }
}
