import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenStorageService } from './TokenStorageService';

const AUTH_API = environment.apiURL + '/carizma/seller';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    public tokenService: TokenStorageService
  ) {}
  // ...
  public isAuthenticated(): boolean {
    const token = this.tokenService.getToken();
    // Check whether the token is expired and return
    // true or false
    // return true;
    return !!this.tokenService.getToken(); //!jwtHelper.isTokenExpired(token);
  }

  public logout() {
    this.tokenService.signOut();
  }
  login(username: string, password: string): Observable<IToken> {
    return this.http.post<IToken>(
      AUTH_API + '/login',
      {
        email_id: username,
        password,
      },
      httpOptions
    );
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + '/signup',
      {
        email_id: email,
        password,
      },
      httpOptions
    );
  }

  refreshToken(token: string) {
    return this.http.post(
      AUTH_API + 'refreshtoken',
      {
        refreshToken: token,
      },
      httpOptions
    );
  }
}

export interface IToken {
  accessToken: string;
  token: string;
}
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

// const AUTH_API = 'http://localhost:8080/api/auth/';

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
// };

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   constructor(private http: HttpClient) {}

//   login(username: string, password: string): Observable<any> {
//     return this.http.post(
//       AUTH_API + 'signin',
//       {
//         username,
//         password,
//       },
//       httpOptions
//     );
//   }

//   register(username: string, email: string, password: string): Observable<any> {
//     return this.http.post(
//       AUTH_API + 'signup',
//       {
//         username,
//         email,
//         password,
//       },
//       httpOptions
//     );
//   }

//   refreshToken(token: string) {
//     return this.http.post(
//       AUTH_API + 'refreshtoken',
//       {
//         refreshToken: token,
//       },
//       httpOptions
//     );
//   }
// }
