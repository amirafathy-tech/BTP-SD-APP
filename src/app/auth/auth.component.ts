import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService, AuthResponseBackend } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  isLoginMode = true;
  isLoading = false;
  error!: string;
  constructor(private authService: AuthService, private router: Router) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    //let authObs: Observable<AuthResponseData>;
    let authObsBackend: Observable<AuthResponseBackend>;
    this.isLoading = true;

    if (this.isLoginMode) {
      const email = form.value.email;
      const password = form.value.password;
      // authObs = this.authService.login(email, password);
      authObsBackend = this.authService.submitLogin(email, password);
      authObsBackend.subscribe(
        resData => {
          console.log(resData);
          this.isLoading = false;
          this.router.navigate(['/servicetype']);
        },
        errorMessage => {
          console.log(errorMessage);
          this.error = errorMessage;
          this.isLoading = false;
        }
      );
    } else {
      const value = form.value.value;
      const familyName = form.value.familyName;
      const givenName = form.value.givenName;
      const userName = form.value.userName;
      // authObs = this.authService.signup(email, password);
      this.authService.submitSignup(value, familyName, givenName, userName);
    }

    // authObsBackend.subscribe(
    //   resData => {
    //     console.log(resData);
    //     this.isLoading = false;
    //     this.router.navigate(['/about']);
    //   },
    //   errorMessage => {
    //     console.log(errorMessage);
    //     this.error = errorMessage;
    //     this.isLoading = false;
    //   }
    // );
    form.reset();
  }
}