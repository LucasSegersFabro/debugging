import { Injectable } from '@nestjs/common';
import { IdpProvider } from '../idp.provider';

@Injectable()
export class IdpProviderRepository {
  private store: IdpProvider[] = [
    new IdpProvider({
      client_id: 'XPTO',
      client_secret: 'shhh',
      discovery_uri:
        'https://accounts.google.com/.well-known/openid-configuration',
      jwks: {
        keys: [
          {
            e: 'AQAB',
            n: '4bAT6C6EeX8Dspje3FrAXw-nnhNk04e1RmNa4kjc0CHf6Pk7ryARlwA-6YilyPABqQfYHx60s8oSnxvUVprFfQ2-Q8aAZO7bPKSxnoGlcKERL2oLNA4Msvc89N9Y5ycThZUplf_QC19e6jyYXN6Nz-UnJSCLrtQY8tVhhVRs61j4A2N_p-enAi-r704Qi1-v-DKV4eVRkClKViploo8NyjUaT9L4vbBssPCjyimJzsWnEe1fED5c4LnHeArYzA_FEn3JJotqDIz9t2VnvZNTMhizHEX4VnORlEWMEfR8n4CEHQx7PcQUOmfqyw08gWeXQl1-uTjtIGaE-sRIv9u_vQ',
            alg: 'RS256',
            kid: '2af90e87be140c20038898a6efa11283dab6031d',
            kty: 'RSA',
            use: 'sig',
          },
          {
            e: 'AQAB',
            n: 'nzGsrziOYrMVYMpvUZOwkKNiPWcOPTYRYlDSdRW4UpAHdWPbPlyqaaphYhoMB5DXrVxI3bdvm7DOlo-sHNnulmAFQa-7TsQMxrZCvVdAbyXGID9DZYEqf8mkCV1Ohv7WY5lDUqlybIk1OSHdK7-1et0QS8nn-5LojGg8FK4ssLf3mV1APpujl27D1bDhyRb1MGumXYElwlUms7F9p9OcSp5pTevXCLmXs9MJJk4o9E1zzPpQ9Ko0lH9l_UqFpA7vwQhnw0nbh73rXOX2TUDCUqL4ThKU5Z9Pd-eZCEOatKe0mJTpQ00XGACBME_6ojCdfNIJr84Y_IpGKvkAEksn9w',
            alg: 'RS256',
            kid: '87bbe0815b064e6d449cac999f0e50e72a3e4374',
            kty: 'RSA',
            use: 'sig',
          },
        ],
      },
      id: 1,
      issuer: 'https://accounts.google.com',
      name: 'Google Social Login',
    }),
    new IdpProvider({
      client_id: 'XPTO',
      client_secret: 'shhh',
      discovery_uri: '',
      jwks: {
        keys: [
          {
            e: 'AQAB',
            n: '4bAT6C6EeX8Dspje3FrAXw-nnhNk04e1RmNa4kjc0CHf6Pk7ryARlwA-6YilyPABqQfYHx60s8oSnxvUVprFfQ2-Q8aAZO7bPKSxnoGlcKERL2oLNA4Msvc89N9Y5ycThZUplf_QC19e6jyYXN6Nz-UnJSCLrtQY8tVhhVRs61j4A2N_p-enAi-r704Qi1-v-DKV4eVRkClKViploo8NyjUaT9L4vbBssPCjyimJzsWnEe1fED5c4LnHeArYzA_FEn3JJotqDIz9t2VnvZNTMhizHEX4VnORlEWMEfR8n4CEHQx7PcQUOmfqyw08gWeXQl1-uTjtIGaE-sRIv9u_vQ',
            alg: 'RS256',
            kid: '2af90e87be140c20038898a6efa11283dab6031d',
            kty: 'RSA',
            use: 'sig',
          },
          {
            e: 'AQAB',
            n: 'nzGsrziOYrMVYMpvUZOwkKNiPWcOPTYRYlDSdRW4UpAHdWPbPlyqaaphYhoMB5DXrVxI3bdvm7DOlo-sHNnulmAFQa-7TsQMxrZCvVdAbyXGID9DZYEqf8mkCV1Ohv7WY5lDUqlybIk1OSHdK7-1et0QS8nn-5LojGg8FK4ssLf3mV1APpujl27D1bDhyRb1MGumXYElwlUms7F9p9OcSp5pTevXCLmXs9MJJk4o9E1zzPpQ9Ko0lH9l_UqFpA7vwQhnw0nbh73rXOX2TUDCUqL4ThKU5Z9Pd-eZCEOatKe0mJTpQ00XGACBME_6ojCdfNIJr84Y_IpGKvkAEksn9w',
            alg: 'RS256',
            kid: '87bbe0815b064e6d449cac999f0e50e72a3e4374',
            kty: 'RSA',
            use: 'sig',
          },
        ],
      },
      id: 2,
      issuer: 'https://accounts.microsoft.com',
      name: 'Microsoft Social',
    }),
  ];

  public findByIssuer(issuer: string) {
    this.store.find((s) => s.issuer === issuer);
  }

  public addProvider(provider: IdpProvider) {
    this.store.push(provider);
  }
}
