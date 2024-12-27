import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from '../../models/user';
import { AuthResponse } from '../../models/auth-response';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private AUTH_KEY = 'AUTH_RESPONSE';

  private currentResponse: BehaviorSubject<AuthResponse | undefined> =
    new BehaviorSubject<AuthResponse | undefined>(undefined);

  get currentUser(): User | undefined {
    return this.currentResponse.value?.user;
  }

  get currentToken(): string | undefined {
    return this.currentResponse.value?.token;
  }

  get isLogged(): boolean {
    return !!this.currentResponse.value;
  }

  constructor(
    private http: HttpClient,
    private toast: HotToastService,
    private router: Router,
  ) {
    const session = sessionStorage.getItem(this.AUTH_KEY);
    if (session) this.currentResponse.next(JSON.parse(session));
    this.currentResponse.subscribe((response) => {
      if (response)
        sessionStorage.setItem(this.AUTH_KEY, JSON.stringify(response));
      else sessionStorage.clear();
    });
  }

  // register(user: User): Observable<void> {
  //   return this.http.post<AuthResponse>(`${environment.API_URL}/auth/register`, user)
  //     .pipe(this.toast.observe({
  //       loading: "Enregistrement en cours...",
  //       error: "Une erreur empêche l'inscription",
  //       success: response => `L'inscription de ${response.user.firstName} ${response.user.lastName} a été enregistrer avec succès`
  //     }), map(() => { }))
  // }

  login(credentials: { email: string; password: string }) {
    return this.http
      .post<AuthResponse>(`${environment.API_URL}/auth/login`, credentials)
      .pipe(
        this.toast.observe({
          loading: 'Connexion en cours...',
          error: "L'identifiant ou le mot de passe est incorrect",
          success: (response) => `Bienvenue ${response.user.firstName}`,
        }),
        tap((response) => this.currentResponse.next(response)),
      );
  }

  logout() {
    this.currentResponse.next(undefined);
    this.router.navigate(['/auth', { outlets: { authOutlet: 'login' } }]);
  }

  ping() {
    return this.http.get(environment.API_URL);
  }
}
