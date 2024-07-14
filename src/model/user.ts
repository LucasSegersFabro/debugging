type UserAttrs = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export class User {
  id: number;
  name: string;
  email: string;
  password: string;

  constructor(obj: UserAttrs) {
    Object.entries(obj).forEach(([k, v]) => (this[k] = v));
  }
}
