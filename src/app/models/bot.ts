import { Server } from './server';

export interface Bot {
  id: number;
  version: number;
  servers: Server[];
}
