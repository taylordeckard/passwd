import { Credentials } from './Credentials.interface';

export interface User {
  username: string;
  data: Credentials[];
}
