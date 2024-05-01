import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { TrollMessageBDDComponent } from './views/troll-message-bdd/troll-message-bdd.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { HomeComponent } from './views/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ElementBDDComponent } from './components/element-bdd/element-bdd.component';
import { ScheduleBDDComponent } from './views/schedule-bdd/schedule-bdd.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
} from '@angular-material-components/datetime-picker';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import * as fr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { NgxMultipleDatesModule } from 'ngx-multiple-dates';
import { MatCardModule } from '@angular/material/card';
import { TimePickerComponent } from './components/time-picker/time-picker.component';
import { EventModalAddComponent } from './components/event-modal-add/event-modal-add.component';
import { TruncatePipe } from './pipes/truncate/truncate.pipe';
import { AuthModule } from '../auth/auth.module';
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    FooterComponent,
    TrollMessageBDDComponent,
    PageNotFoundComponent,
    HomeComponent,
    ElementBDDComponent,
    ScheduleBDDComponent,
    DatePickerComponent,
    TimePickerComponent,
    TruncatePipe,
    EventModalAddComponent,
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
    AuthModule,
    FormsModule,
    MatInputModule,
    HttpClientModule,
    HotToastModule.forRoot({
      theme: 'snackbar',
    }),
    AppRoutingModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    registerLocaleData(fr.default);
  }
}
