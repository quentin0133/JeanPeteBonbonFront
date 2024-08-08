import { Component } from '@angular/core';
import {AuthService} from "../../services/./auth/auth.service";
import {NavigationEnd, Router} from "@angular/router";
import {filter, map} from "rxjs";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  collapse : boolean = false
  currentRoute : string = "/";

  constructor(private authService: AuthService, private router : Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd)
        this.currentRoute = router.url;
    });
  }

  logout = () => this.authService.logout();
}
