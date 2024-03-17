import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { TrollMessageBDDComponent } from './components/troll-message-bdd/troll-message-bdd.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { HomeComponent } from './views/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ElementBDDComponent } from './components/element-bdd/element-bdd.component';
import { ScheduleBDDComponent } from './components/schedule-bdd/schedule-bdd.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
} from '@angular-material-components/datetime-picker';
import { FormsModule } from '@angular/forms';
import * as fr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { NgxMultipleDatesModule } from 'ngx-multiple-dates';
import { MatCardModule } from '@angular/material/card';
import { TimePickerComponent } from './components/time-picker/time-picker.component';
import { TruncatePipe } from './pipes/truncate.pipe';

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
    ScheduleBDDComponent,
    DatePickerComponent,
    TimePickerComponent,
    TruncatePipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxMatDatetimePickerModule,
    MatMenuModule,
    MatIconModule,
    MatMomentDateModule,
    MatCardModule,
    NgxMatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    NgxMultipleDatesModule,
    FormsModule,
    MatInputModule,
    HttpClientModule,
    HotToastModule.forRoot({
      theme: 'snackbar',
    }),
    AppRoutingModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    registerLocaleData(fr.default);
  }
}
