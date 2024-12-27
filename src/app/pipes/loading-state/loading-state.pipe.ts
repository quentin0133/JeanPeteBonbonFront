import { Pipe, PipeTransform } from '@angular/core';
import { catchError, map, Observable, of, startWith } from 'rxjs';

export interface LoadingState<T> {
  loading: boolean;
  data?: T;
  error?: Error;
}

@Pipe({
  name: 'loadingState',
})
export class LoadingStatePipe implements PipeTransform {
  transform<T>(val: Observable<T>): Observable<LoadingState<T>> {
    return val.pipe(
      map((data) => ({ loading: false, data })),
      startWith({ loading: true }),
      catchError((error) => {
        console.error('Erreur du backend:', error);
        return of({ loading: false, error });
      }),
    );
  }
}
