import { Injectable } from '@angular/core';
import { Schedule } from '../../models/schedule';
import { HotToastService } from '@ngneat/hot-toast';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private ENDPOINT = `${environment.API_URL}/schedules`;

  constructor(
    private toast: HotToastService,
    private http: HttpClient,
  ) {}

  private schedulesSubject: BehaviorSubject<void> = new BehaviorSubject<void>(
    undefined,
  );

  refresh() {
    this.schedulesSubject.next();
  }

  findAll(): Observable<Schedule[]> {
    return this.schedulesSubject.pipe(
      switchMap(() => this.http.get<Schedule[]>(this.ENDPOINT)),
    );
  }

  findByQuery(
    searchLabel: string,
    searchElement: string,
  ): Observable<Schedule[]> {
    return this.schedulesSubject.pipe(
      switchMap(() =>
        this.http.get<Schedule[]>(
          `${this.ENDPOINT}?${searchLabel}_like=${searchElement}`,
        ),
      ),
    );
  }

  save(schedule: Schedule): Observable<Schedule> {
    return this.http.post<Schedule>(this.ENDPOINT, schedule).pipe(
      this.toast.observe({
        loading: "Ajout de l'évèment en cours...",
        error: "Erreur, l'évènement n'a pas pu être ajouté !",
        success: (response) =>
          `L'évènement n°${response.id} a été ajouté avec succès !`,
      }),
      tap(() => this.refresh()),
    );
  }

  update(schedule: Schedule): Observable<Schedule> {
    return this.http
      .put<Schedule>(this.ENDPOINT, schedule)
      .pipe(tap(() => this.refresh));
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.ENDPOINT}/${id}`).pipe(
      this.toast.observe({
        loading: "Suppression de l'évènement en cours...",
        error: `Erreur, l'évènement n°${id} n'a pas pu être supprimé !`,
        success: () => `L'évènement n°${id} a été supprimé avec succès !`,
      }),
      tap(() => this.refresh()),
    );
  }
}
