import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Guild} from "../../models/guild";
import {HotToastService} from "@ngneat/hot-toast";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GuildService {
  private ENDPOINT = `${environment.API_URL}/guilds`;

  constructor(
    private http: HttpClient
  ) {}

  findAll(): Observable<Guild[]>  {
    return this.http.get<Guild[]>(this.ENDPOINT);
  }
}
