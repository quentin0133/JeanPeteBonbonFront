import {inject, NgModule} from '@angular/core';
import {RouterModule, Routes, UrlTree} from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { TrollMessageBDDComponent } from './views/troll-message-bdd/troll-message-bdd.component';
import { ScheduleBDDComponent } from './views/schedule-bdd/schedule-bdd.component';
import {LoginComponent} from "../auth/components/login/login.component";
import { AuthComponent } from '../auth/views/auth/auth.component';
import { AuthService } from './services/./auth/auth.service';
import {AuthGuard} from "../auth/guards/auth.guard";

const routes: Routes = [
  {path: "auth", component: AuthComponent, canActivate: [() => !inject(AuthService).isLogged || new UrlTree()], children: [
      {path: "login", component: LoginComponent, outlet: "authOutlet"},
      {path: "**", redirectTo: "login", pathMatch: "prefix"}
  ]},
  {path: "", canActivate: [AuthGuard], component: HomeComponent},
  {path: "database", canActivate: [AuthGuard], children: [
    {path: "event", component: ScheduleBDDComponent},
    {path: "troll-message", component: TrollMessageBDDComponent}
  ]},
  {path: "404", component: PageNotFoundComponent},
  {path: "**", redirectTo: "/404", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
