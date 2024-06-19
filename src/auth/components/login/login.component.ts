import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {
  getFormControl,
  isControlInvalid,
} from 'src/tools/reactive-form-tools';
import {AuthService} from "../../../app/services/auth-service/auth.service";
import {Router} from "@angular/router";

const NUMBER_BG_IMG: number = 14;
const BACKGROUND_IMAGE_CHANGE_TIME: number = 6; // seconds
const TRANSITION_DURATION: number = 1.5; // seconds

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  indexBackground: number = Math.floor(Math.random() * NUMBER_BG_IMG) + 1;
  indexTransitionBackground: number = this.indexBackground;

  @ViewChild('bgImage') bgImage!: ElementRef;
  @ViewChild('bgImageTransition') bgImageTransition!: ElementRef;

  imageSlideInterval: number = 0;
  imageTransitionTimeOut: number = 0;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  });

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.imageSlideInterval = setInterval(() => {
      this.setBgImageOpacity(0);
      this.indexTransitionBackground = this.indexBackground;
        do {
        this.indexBackground = Math.floor(Math.random() * 4) + 1;
      } while (this.indexTransitionBackground === this.indexBackground);

      this.fadeOutBackgroundImage();
    }, (BACKGROUND_IMAGE_CHANGE_TIME + TRANSITION_DURATION) * 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.imageSlideInterval);
    clearTimeout(this.imageTransitionTimeOut);
  }

  fadeOutBackgroundImage() {
    let opacity = 0;
    let opacityTransition = setInterval(() => {
      opacity += 0.01;
      this.setBgImageOpacity(opacity);
    }, TRANSITION_DURATION * 10);

    this.imageTransitionTimeOut = setTimeout(() => {
      this.setBgImageOpacity(1);
      clearInterval(opacityTransition);
    }, TRANSITION_DURATION * 1000)
  }

  setBgImageOpacity(opacity: number) {
    this.bgImage.nativeElement.style.opacity = opacity;
    this.bgImageTransition.nativeElement.style.opacity = 1 - opacity;
  }

  handleSubmit(e: any) {
    e.preventDefault();
    if (!this.loginForm.invalid)
      this.authService.login(this.loginForm.value).subscribe(() => this.router.navigate(["/"]));
  }

  getFormControl(name: string) {
    return getFormControl(this.loginForm, name);
  }

  isInvalid(name: string) {
    return isControlInvalid(this.getFormControl(name));
  }

  hasError(name: string, errorCode: string) {
    let formControl = this.getFormControl(name);
    return formControl?.touched && formControl?.hasError(errorCode);
  }
}
