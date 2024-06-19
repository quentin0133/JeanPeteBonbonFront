import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from "./components/login/login.component";
import {ReactiveFormsModule} from "@angular/forms";
import { AuthComponent } from './views/auth/auth.component';
import {RouterOutlet} from "@angular/router";

@NgModule({
  declarations: [LoginComponent, AuthComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterOutlet],
  exports: [LoginComponent],
})
export class AuthModule {}
