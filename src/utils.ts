export enum JwtPart {
  HEADER = 0,
  BODY = 1,
  SIG = 2,
}

export function readJwtPart(jwt: string, part: JwtPart): unknown {
  const split = jwt.split('.');
  const unparsedPart = split[part];
  return JSON.parse(Buffer.from(unparsedPart, 'base64').toString('utf-8'));
}
