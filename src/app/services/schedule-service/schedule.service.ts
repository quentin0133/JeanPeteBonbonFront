import { Injectable } from '@angular/core';
import { Schedule } from '../../models/schedule';
import { HotToastService } from '@ngneat/hot-toast';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, scheduled, tap} from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private ENDPOINT = `${environment.API_URL}/schedules`;
  private schedulesSubject: BehaviorSubject<Schedule[]> = new BehaviorSubject<Schedule[]>([]);
  public schedulesItems = this.schedulesSubject.asObservable();

  constructor(
    private toast: HotToastService,
    private http: HttpClient,
  ) {}

  updateSuchedules() {
    this.findAll().subscribe(schedules => this.schedulesSubject.next(schedules));
  }

  findAll(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(this.ENDPOINT);
  }

  findById(id: number): Observable<Schedule> {
    return this.http.get<Schedule>(`${this.ENDPOINT}/${id}`);
  }

  save(schedule: Schedule): Observable<Schedule> {
    return this.http.post<Schedule>(this.ENDPOINT, schedule)
      .pipe(this.toast.observe({
        loading: "Ajout de l'évèment en cours...",
        error: "Erreur, l'évènement n'a pas pu être ajouter !",
        success: response => `L'évènement n°${response.id} a été ajouter avec succès !`
      }));
  }

  update(schedule: Schedule): Observable<Schedule> {
    return this.http.put<Schedule>(this.ENDPOINT, schedule);
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.ENDPOINT}/${id}`)
      .pipe(this.toast.observe({
        loading: "Suppression de l'évènement en cours...",
        error: "Erreur, l'évènement n°${id} n'a pas pu le supprimer !",
        success: response => `L'évènement n°${id} a été supprimé avec succès !`
      }));
  }
}
