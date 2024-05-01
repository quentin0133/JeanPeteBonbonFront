import { Injectable } from '@angular/core';
import { Server } from '../../models/server';

@Injectable({
  providedIn: 'root',
})
export class BotService {
  constructor() {}

  findAllServer(): Server[] {
    return [];
  }
}
