import { Component } from '@angular/core';
import {AuthService} from "./services/./auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jean-petebonbon-front';

  constructor(private authService: AuthService) {
  }

  get isLogged(): boolean {
    return this.authService.isLogged;
  }
}
