import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { TrollMessageBDDComponent } from './views/troll-message-bdd/troll-message-bdd.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { HomeComponent } from './views/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as fr from '@angular/common/locales/fr';
import { NgOptimizedImage, registerLocaleData } from '@angular/common';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { NgxMultipleDatesModule } from 'ngx-multiple-dates';
import { MatCardModule } from '@angular/material/card';
import { TimePickerComponent } from './components/time-picker/time-picker.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { TruncatePipe } from './pipes/truncate/truncate.pipe';
import { AuthModule } from '../auth/auth.module';
import { MatSelectModule } from '@angular/material/select';
import { LoadingStatePipe } from './pipes/loading-state/loading-state.pipe';
import { HeaderInterceptor } from '../interceptor/header/interceptor/header.interceptor.service';
import { ErrorInterceptor } from '../interceptor/error/interceptor/error.interceptor.service';
import { TheaderComponent } from './components/table/theader/theader.component';
import { TbodyComponent } from './components/table/tbody/tbody.component';
import { EventModalDeleteComponent } from './components/modals/event-modal-delete/event-modal-delete.component';
import { EventModalAddComponent } from './components/modals/event-modal-add/event-modal-add.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    FooterComponent,
    TrollMessageBDDComponent,
    PageNotFoundComponent,
    HomeComponent,
    ScheduleBDDComponent,
    DatePickerComponent,
    TimePickerComponent,
    TruncatePipe,
    EventModalAddComponent,
    SearchBarComponent,
    LoadingStatePipe,
    TheaderComponent,
    TbodyComponent,
    EventModalDeleteComponent,
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
    NgOptimizedImage,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    registerLocaleData(fr.default);
  }
}
