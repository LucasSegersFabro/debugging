import { Injectable } from '@nestjs/common';
import { IdpProvider } from '../idp.provider';
import { googleSocial, localProvider, microsoftSocial } from './idp.stubs';
import { User } from '../user';

type UserProvider = {
  user_id: number;
  provider_id: number;
  sub: string;
};

@Injectable()
export class IdpProviderRepository {
  private store: IdpProvider[] = [localProvider, googleSocial, microsoftSocial];

  private userProviderStore: UserProvider[] = [
    {
      provider_id: 1,
      sub: '1',
      user_id: 1,
    },
    {
      provider_id: 3,
      sub: 'AAAAAAAAAAAAAAAAAAAAAMnlvhgOpDp6Rz1WDndQsEA',
      user_id: 1,
    },
  ];

  public findByIssuer(issuer: string) {
    return this.store.find((s) => s.issuer === issuer);
  }

  public addProvider(provider: IdpProvider) {
    this.store.push(provider);
  }

  public findUserByIdAndProvider(
    providerIdentifier: string,
    providerId: number,
  ) {
    return this.userProviderStore.find(
      (s) => s.sub === providerIdentifier && s.provider_id === providerId,
    );
  }

  public linkUserToProvider(
    user: User,
    providerSub: string,
    providerId: number,
  ) {
    this.userProviderStore.push({
      provider_id: providerId,
      sub: providerSub,
      user_id: user.id,
    });
  }
}
