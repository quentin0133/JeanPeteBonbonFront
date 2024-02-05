import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { TrollMessageBDDComponent } from './components/troll-message-bdd/troll-message-bdd.component';
import { ScheduleBDDComponent } from './components/schedule-bdd/schedule-bdd.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "database", children: [
    {path: "event", component: ScheduleBDDComponent},
    {path: "troll-message", component: TrollMessageBDDComponent}
  ]},
  {path: "**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }