import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { TrollMessageBDDComponent } from './components/troll-message-bdd/troll-message-bdd.component';
import { HttpClientModule } from "@angular/common/http";
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HotToastModule } from '@ngneat/hot-toast';
import { HomeComponent } from './views/home/home.component';
import { ElementBDDComponent } from './components/element-bdd/element-bdd.component';
import { ScheduleBDDComponent } from './components/schedule-bdd/schedule-bdd.component';
import * as fr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    FooterComponent,
    LoginComponent,
    TrollMessageBDDComponent,
    PageNotFoundComponent,
    HomeComponent,
    ElementBDDComponent,
    ScheduleBDDComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HotToastModule.forRoot({
      theme: "snackbar"
    }),
    AppRoutingModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: "fr-FR" }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(fr.default);
  }
}
