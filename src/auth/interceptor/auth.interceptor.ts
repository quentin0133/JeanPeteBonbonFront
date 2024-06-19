import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HotToastService } from '@ngneat/hot-toast';
import {AuthService} from "../../app/services/auth-service/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private service : AuthService, private toast: HotToastService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.service.currentToken;
    if (token && request.url.startsWith(environment.API_URL)) {
      request = request.clone({
        setHeaders: {
          Authorization : `Bearer ${token}`
        }
      })
    }

    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        this.toast.error("Veuillez vous reconnecter")
        this.service.logout()
      }
      return throwError(() => err)
    }));
  }
}
