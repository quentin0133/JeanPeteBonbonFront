import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bot } from '../../models/bot';

@Injectable({
  providedIn: 'root',
})
export class BotService {
  private END_POINT = `${environment.API_URL}/bot`;

  constructor(private http: HttpClient) {}

  getBot(): Observable<Bot> {
    return this.http.get<Bot>(this.END_POINT);
  }
}
