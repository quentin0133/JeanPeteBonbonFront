export interface Schedule {
  id: number;
  version: number;
  serversId: number[];
  message: string;
  dates: Date[];
  times: Date[];
}
