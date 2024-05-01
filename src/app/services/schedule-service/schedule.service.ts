import { Injectable } from '@angular/core';
import { Schedule } from '../../models/schedule';
import { HotToastService } from '@ngneat/hot-toast';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private ENDPOINT = environment.API_URL + "/schedules"

  constructor(private toast: HotToastService, private http: HttpClient) {}

  findAll(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(this.ENDPOINT);
  }

  findById(id: number): Observable<Schedule> {
    return this.http.get<Schedule>(`${this.ENDPOINT}/${id}`);
  }

  save(schedule: Schedule): Observable<Schedule> {
    return this.http.post<Schedule>(this.ENDPOINT, schedule);
  }

  update(schedule: Schedule): Observable<Schedule> {
    return this.http.put<Schedule>(this.ENDPOINT, schedule);
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.ENDPOINT}/${id}`);
  }
}
