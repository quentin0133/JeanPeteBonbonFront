import { Pipe, PipeTransform } from '@angular/core';
import {catchError, map, Observable, of, startWith} from "rxjs";

 export interface ObsWithStatusResult<T> {
   loading: boolean;
   value?: T;
   error?: string;
 }

@Pipe({
  name: 'obsWithStatus'
})
export class ObsWithStatusPipe implements PipeTransform {

  transform<T = any>(val: Observable<any>): Observable<ObsWithStatusResult<T>> {
    return val.pipe(
      map((value: any) => ({
        loading: value.type === 'start',
        value: value.type ? value.value : value
      })),
      startWith({ loading: true }),
      catchError(error => of({ loading: false, error }))
    );
  }

}
