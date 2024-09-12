import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, delay, EMPTY, Observable, throwError } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../../../app/services/auth/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private error401Handled = false;

  constructor(
    private authService: AuthService,
    private toast: HotToastService,
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.error instanceof ErrorEvent) {
          console.log('Error Event');
        } else {
          switch (err.status) {
            case 0: // Server doesn't respond
              this.toast.error('Le serveur ne répond pas');
              return EMPTY;
            case 401: // Unautorized
              if (!this.authService.isLogged) break;
              this.toast.error('Session expiré, veuillez vous reconnecter');
              this.authService.logout();
              return EMPTY;
            case 403: // Forbidden
              this.toast.error(
                "Vous n'avez pas les droits d'accès à cette page",
              );
              return EMPTY;
            case 404: // Not found
              this.toast.error("Cette page n'existe pas");
              break;
            default:
              console.error(err.status);
          }
        }
        return throwError(() => err);
      }),
    );
  }
}
