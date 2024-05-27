import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject, of } from 'rxjs';
import { AuthUser } from './auth-user.model';

export interface AuthResponseBackend {
  access_token: string;
  refresh_token: string;
  id_token: string;
  token_type: string;
  expires_in: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private authURL = "";
  private clientID = "ab5b8d6b-8a93-4491-a363-6c6cd91747f3"
  private clientSecret = "1=1dzK@gH=qyI04.Fuw.s7DGWEw4b?@[B"

  userBackend = new BehaviorSubject<AuthUser |null>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  submitSignup(value: string, familyName: string, givenName: string, userName: string) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const data={
      'value' :value,
      'familyName':familyName,
      'givenName':givenName,
      'userName': userName
    }
    const config = {
      maxBodyLength:Infinity,
      headers,
      body: JSON.stringify(data)
    };

    this.http
      .post<any>(
        'https://re-security.c0749e2.kyma.ondemand.com/iasusers',
        data,{headers}
      )
      .pipe(
           catchError(error => {
              console.error(error);
              return of(null);
            })
          )
          .subscribe(response => {
            if (response) {
              console.log(response);
              if (response) {
                console.log(response);
                this.router.navigate(['/servicetype']);
              
              } else if (response.error_description === "User authentication failed.") {
                console.log("40000000");
              } else {
                console.log(response);
              }
            }
    
          });
  }

  // will be integrated with SAP Auth idenetity service
  submitLogin(email: string, password: string) {

    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${this.clientID}:${this.clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const data = new URLSearchParams();
    data.set('grant_type', 'password');
    data.set('username', email);
    data.set('password', password);

    return this.http
      .post<AuthResponseBackend>(
        'https://cors-anywhere.herokuapp.com/https://as0bsn6rg.trial-accounts.ondemand.com/oauth2/token ',
        data.toString(), { headers }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          console.log(resData.id_token);
          const user = new AuthUser(email, resData.id_token);
          // const user = new AuthUser(email, resData.id_token,"admin");
          localStorage.setItem('token', resData.id_token);
          this.userBackend.next(user);
        })
      );   
  }

//   autoLogin() {
//     const userData: {
//       email: string;
//       id: string;
//       _token: string;
//       _tokenExpirationDate: string;
//     } = JSON.parse(localStorage.getItem('userData'));
//     if (!userData) {
//       return;
//     }

//     const loadedUser = new User(
//       userData.email,
//       userData.id,
//       userData._token,
//       new Date(userData._tokenExpirationDate)
//     );

//     if (loadedUser.token) {
//       this.user.next(loadedUser);
//       const expirationDuration =
//         new Date(userData._tokenExpirationDate).getTime() -
//         new Date().getTime();
//       this.autoLogout(expirationDuration);
//     }
//   }


  logout() {
    this.userBackend.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('token');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }



  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

//   private handleAuthentication(
//     email: string,
//     userId: string,
//     token: string,
//     expiresIn: number
//   ) {
//     const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
//     const user = new User(email, userId, token, expirationDate);
//     this.user.next(user);
//     this.autoLogout(expiresIn * 1000);
//     localStorage.setItem('userData', JSON.stringify(user));
//   }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }

}