import { Component } from '@angular/core';
import {AuthService} from "../../services/auth-service/auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  collapse : boolean = false

  constructor(private authService: AuthService) {
  }

  logout = () => this.authService.logout();
}
