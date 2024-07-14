import { UnauthorizedException } from '@nestjs/common';
import * as jsonwebtoken from 'jsonwebtoken';
import * as jwkToPem from 'jwk-to-pem';
import { JwtPart, readJwtPart } from '../utils';

export interface Jwk {
  alg: string;
  kty: string;
  use: string;
  kid: string;
  x5t?: string;
  n: string;
  e: string;
  x5c?: string[];
}

export interface Jwks {
  keys: Jwk[];
}

type ProviderAttrs = {
  id: number;
  name: string;
  discovery_uri: string;
  jwks: Jwks;
  client_id: string;
  issuer: string;
  client_secret: string;
  signing?: {
    private_cert: string;
    public_cert: string;
    keyId: string;
    configuredExpDays: number;
  };
};

export class IdpProvider {
  id: number;
  name: string;
  discovery_uri: string;
  jwks: Jwks;
  client_id: string;
  issuer: string;
  client_secret: string;
  signing?: {
    configuredExpDays: number;
    keyId: string;
    private_cert: string;
    public_cert: string;
  };

  constructor(obj: ProviderAttrs) {
    Object.entries(obj).forEach(([k, v]) => (this[k] = v));
  }

  public validateJwt(jwt: string) {
    let key = this.signing?.public_cert;
    if (!key) {
      const usedKey = readJwtPart(jwt, JwtPart.HEADER) as { kid?: string };
      if (!usedKey.kid) {
        throw new UnauthorizedException();
      }

      const jwk = this.jwks.keys[0];

      // @ts-expect-error: jwk
      key = jwkToPem(jwk);
    }

    jsonwebtoken.verify(jwt, key, { ignoreExpiration: true });
  }

  public signJwt(body: object) {
    if (!this.signing) {
      // cant sign because provider isnt meant to generate jwts
      throw new UnauthorizedException();
    }

    const withExp = {
      ...body,
      exp:
        Math.floor(Date.now() / 1000) +
        60 * 60 * 24 * this.signing.configuredExpDays,
    };
    return jsonwebtoken.sign(withExp, this.signing.private_cert, {
      algorithm: 'RS256',
      keyid: this.signing.keyId,
    });
  }
}
