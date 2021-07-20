import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";

interface UsernameAvailableResponse {
  available: boolean;
}

interface SignUpCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignInCredentials {
  username: string;
  password: string;
}

interface SignupResponse {
  username: string;
}

interface SignedInResponse {
  authenticated: boolean;
  username: string;
}

interface SignInResponse {
  username: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  rootUrl = "https://api.angular-email.com";
  signedin$ = new BehaviorSubject<any>(null);
  username = "";

  constructor(private http: HttpClient) {}

  userNameAvailable(username: string) {
    return this.http.post<UsernameAvailableResponse>(
      `${this.rootUrl}/auth/username`,
      {
        username,
      }
    );
  }

  signup(credentials: SignUpCredentials) {
    return this.http
      .post<SignupResponse>(`${this.rootUrl}/auth/signup`, credentials)
      .pipe(
        tap(({ username }) => {
          this.signedin$.next(true);
          this.username = username;
        })
      );
  }

  checkAuth() {
    return this.http
      .get<SignedInResponse>(`${this.rootUrl}/auth/signedin`)
      .pipe(
        tap(({ authenticated, username }) => {
          this.signedin$.next(authenticated);
          this.username = username;
        })
      );
  }

  signout() {
    return this.http.post(`${this.rootUrl}/auth/signout`, {}).pipe(
      tap(() => {
        this.signedin$.next(false);
      })
    );
  }

  signin(credentials: SignInCredentials) {
    return this.http
      .post<SignInResponse>(`${this.rootUrl}/auth/signin`, credentials)
      .pipe(
        tap(({ username }) => {
          this.signedin$.next(true);
          this.username = username;
        })
      );
  }
}
