import { BaseEntity } from './base-entity';

export interface Schedule extends BaseEntity {
  serversId: number[];
  message: string;
  dates: Date[];
  times: Date[];
}
