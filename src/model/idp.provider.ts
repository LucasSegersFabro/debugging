import * as jsonwebtoken from 'jsonwebtoken';

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
};

export class IdpProvider {
  id: number;
  name: string;
  discovery_uri: string;
  jwks: Jwks;
  client_id: string;
  issuer: string;
  client_secret: string;

  constructor(obj: ProviderAttrs) {
    Object.entries(obj).forEach(([k, v]) => (this[k] = v));
  }

  public validateJwt(jwt: string) {
    jsonwebtoken.verify(jwt, this.jwks.keys.toString());
  }
}
