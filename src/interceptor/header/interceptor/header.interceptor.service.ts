import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../../app/services/auth/auth.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const token = this.authService.currentToken;
    if (token && request.url.startsWith(environment.API_URL)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });
    }

    return next.handle(request);
  }
}
