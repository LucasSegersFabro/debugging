import { Injectable } from '@nestjs/common';
import { IdpProvider } from '../idp.provider';

type UserProvider = {
  user_id: number;
  provider_id: number;
  sub: string;
};

@Injectable()
export class IdpProviderRepository {
  private store: IdpProvider[] = [
    new IdpProvider({
      client_id: 'default',
      client_secret: 'shhh',
      discovery_uri:
        'https://this.service.com/.well-known/openid-configuration',
      jwks: {
        keys: [],
      },
      id: 1,
      issuer: 'https://this.service.com',
      name: 'Our Local Provider',
      signing: {
        configuredExpDays: 2,
        keyId: 'DEFAULT',
        private_cert: `-----BEGIN PRIVATE KEY-----
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
Hq655PDasbIKFheb/mewrk8pQ43pZAk=
-----END PRIVATE KEY-----`,
        public_cert: `-----BEGIN CERTIFICATE-----
MIIGKTCCBBGgAwIBAgIUDlIvBJMmwFXrC9dYGHfaNyyNvbcwDQYJKoZIhvcNAQEL
BQAwgaMxCzAJBgNVBAYTAkJSMRIwEAYDVQQIDAlTYW8gUGF1bG8xCzAJBgNVBAcM
AlNQMRcwFQYDVQQKDA5TcGxpdEMtU3RhZ2luZzELMAkGA1UECwwCSVQxIjAgBgNV
BAMMGXN0YWdpbmctYXBpLnNwbGl0Yy5jb20uYnIxKTAnBgkqhkiG9w0BCQEWGmx1
Y2FzLnNlZ2Vyc0BzcGxpdGMuY29tLmJyMB4XDTI0MDcwMTIxMjcxNFoXDTI0MDcz
MTIxMjcxNFowgaMxCzAJBgNVBAYTAkJSMRIwEAYDVQQIDAlTYW8gUGF1bG8xCzAJ
BgNVBAcMAlNQMRcwFQYDVQQKDA5TcGxpdEMtU3RhZ2luZzELMAkGA1UECwwCSVQx
IjAgBgNVBAMMGXN0YWdpbmctYXBpLnNwbGl0Yy5jb20uYnIxKTAnBgkqhkiG9w0B
CQEWGmx1Y2FzLnNlZ2Vyc0BzcGxpdGMuY29tLmJyMIICIjANBgkqhkiG9w0BAQEF
AAOCAg8AMIICCgKCAgEAwMePoYmrwzB0HVAvn6tzmG+Sg1zl/5Q9Q4mdOPMs5Ghd
+dLpOp+ErJ+zsTfLmWmzY58OQXCZRAKVlUiQ30PRnTwVo2Q9bvQnVtfFXXWFIJU5
D+SkDDXPGiL480msziSw5T5QbmjyMVA3n0uUmU7lBJFbyUZTi1QhEw2yKCqV3lqT
D+mOkSq6VtAp29u7zm+cNHoHJeMFysHWaIA0YUGtUe1jy3xKJdVoqkufpfLeyDpP
oK4XVkJTmN96HKc5y/LVcKywlZCI4xqKhjlx7PlU6Llaghiq+k0y/P3vBQqk601+
PU4jboMiPMYf2sZwXCQhGDq6R7sPaBUV6jQTmReqPSo/brg1FYVYhpLbbK6Je7DZ
7ny1JE3AqQZ8iPYZ2mXijcE3S15b9V/gLBWUbTuycpODAxz8khOVEzGo0XgXTTea
AjyqxKgXR/JeKaluUHopH5aL21kiKQ7q/11W501gLelsp1X9aasbQaiiucf/8H7d
bDTgmzhMKttZpu8AU4DEBj0DkWwa4ybjHE2riZuLGoj7KEZ0zu/Dfn2Ge7KkP5ct
quPtCBrpg88LCwEZgFY5n96mOfMg8HyCqQ15nfd65Kd4CZNGcIjz01Cq0iNoJ8Po
4zaXkDoCBYX364BzxxbULX5zCFa+DMxVIFNLeOMJkhtNcyUVnzecePAI770HogEC
AwEAAaNTMFEwHQYDVR0OBBYEFBVqAa4uFX2l7SY1BhS0HWhnIIh2MB8GA1UdIwQY
MBaAFBVqAa4uFX2l7SY1BhS0HWhnIIh2MA8GA1UdEwEB/wQFMAMBAf8wDQYJKoZI
hvcNAQELBQADggIBALY8LE1EbvHkgyKV3i/hs6OwzJNaTXvmgePLRN2nVVWAHttW
GuSU2oy/63EWcIeRu52p9Sj3F8wWRyHa6gcT2mcZUZKv1K4N11S183ufp6Ed7fnw
28s3bDlqUNBe2eioZ7xZdnSTRQ0nCJWmSoYnxwzUXSHXKTTcvMrpEZn6q5gsphPX
/7ixOGqM0pE3X5uVfBjr6Gwi/uv//pDjjCnX0G/eWDI9A1FmuPBIDxDxGAENLCsW
GPycitiyEfhhchyirL1+lYDiADIFJ/ciVLaTmfBUR1fhBf6H1oRVPoxy3k6iuSR2
vnBnJdfH6PDF6LSztX41AFK+zvCP5f2FZSHwqav8z9YP4cEkqyWn5MrWUhmmSDzi
SYAdStuxgjrHGqNZzyH0mKX1XMQi6LXukZxwW/rqR6y9GROJeA5WFsyaU2NWNqn8
b4XwJlz7y7vVP3qt3NKYRU4m6SL3D/tZsw153KXBoqoWUG98cOHeZX/R/tzOPnQ4
O+H0BJ2eQAgZYj01luvcf33rQLIVd2VeD4S6g7rJWYm2s1ul3e5Jfb4pAQ7L/WeM
uU2n9qbXDCfmTwDH4qtvHe26fIwkKxmiESEFGEidIn6jyspFfAhsSs/5AsVpwcq3
0Abro9dOTLd3YXAGu2qh/jFOV48b5VzDh9w3nhBQi0LWcT5D1bjH6ofFFu7k
-----END CERTIFICATE-----`,
      },
    }),
    new IdpProvider({
      client_id: 'default',
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
      id: 2,
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
      id: 3,
      issuer: 'https://accounts.microsoft.com',
      name: 'Microsoft Social',
    }),
  ];

  private userProviderStore: UserProvider[] = [
    {
      provider_id: 1,
      sub: '1',
      user_id: 1,
    },
  ];

  public findByIssuer(issuer: string) {
    return this.store.find((s) => s.issuer === issuer);
  }

  public addProvider(provider: IdpProvider) {
    this.store.push(provider);
  }

  public findUserByIdAndProvider(userId: number, providerId: number) {
    return this.userProviderStore.find(
      (s) => s.user_id === userId && s.provider_id === providerId,
    );
  }
}
