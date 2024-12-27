import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/./auth/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  collapse: boolean = false;
  currentRoute: string = '/';

  mouseTimeOutEvent: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private hotToastService: HotToastService,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) this.currentRoute = router.url;
    });
  }

  ngOnInit(): void {
    this.setTheme();
  }

  handleThemeMouseDown() {
    this.mouseTimeOutEvent = setTimeout(() => {
      localStorage.removeItem('theme');
      this.setTheme();
      this.hotToastService.info('Thème réglé par préférence du navigateur');
      this.mouseTimeOutEvent = null;
    }, 3000);
  }

  handleThemeMouseUp() {
    if (!this.mouseTimeOutEvent) return;

    clearTimeout(this.mouseTimeOutEvent);
    this.mouseTimeOutEvent = null;
    this.toggleTheme();
  }

  handleThemeMouseLeave() {
    if (!this.mouseTimeOutEvent) return;

    clearTimeout(this.mouseTimeOutEvent);
    this.mouseTimeOutEvent = null;
  }

  hasRoute(...routes: string[]): boolean {
    return routes.includes(this.currentRoute);
  }

  logout = () => this.authService.logout();

  toggleTheme() {
    localStorage['theme'] = localStorage['theme'] === 'dark' ? 'light' : 'dark';
    this.setTheme();
  }

  setTheme() {
    document.body.classList.toggle(
      'dark',
      localStorage.getItem('theme') === 'dark',
    );
  }
}
