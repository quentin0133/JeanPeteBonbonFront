import { Component } from '@angular/core';
import {AuthService} from "./services/auth-service/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jean-kasskouille-front';

  constructor(private authService: AuthService) {
  }

  get isLogged(): boolean {
    return this.authService.isLogged;
  }
}
