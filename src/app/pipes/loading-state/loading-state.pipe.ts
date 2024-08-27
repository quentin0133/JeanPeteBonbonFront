import { Pipe, PipeTransform } from '@angular/core';
import {catchError, delay, map, Observable, of, startWith} from "rxjs";

interface LoadingState<T = unknown> {
  loading: boolean;
  data?: T;
  error?: Error;
}

@Pipe({
  name: 'loadingState'
})
export class LoadingStatePipe implements PipeTransform {

  transform<T = any>(val: Observable<any>): Observable<LoadingState<T>> {
    return val.pipe(
      delay(2000),
      map((data) => ({ loading: false, data })),
      startWith({ loading: true }),
      catchError((error) => of({ loading: false, error }))
    );
  }

}
