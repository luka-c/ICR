import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, tap, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User | undefined>(undefined);
  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {

  }

  signup(email: string, password: string) {

  }

  logout() {
    this.user.next(undefined);
    localStorage.clear();
    this.router.navigate(["/login"]);
  }

  autoLogin() {
    const userData: {
      email: string,
      name: string,
      surname: string,
      password: string,
      id: number,
    } = JSON.parse(localStorage.getItem("User")!);

    if (!userData) return;
    const storedUser = new User(userData.email, userData.name, userData.surname, userData.password, userData.id)

    this.user.next(storedUser);
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let msg = "An unknown error has occurred.";
    if (!errorResponse.error || !errorResponse.error.error)
      return throwError(() => msg);

    switch (errorResponse.error.error.message) {
      case "EMAIL_EXISTS":
        msg = "This email already exists.";
        break;
      case "EMAIL_NOT_FOUND":
        msg = "The email or password is incorrect.";
        break;
      case "INVALID_PASSWORD":
        msg = "The email or password is incorrect."
        break;
    }
    return throwError(() => msg);
  }

  // private authenticate() {
  //   this.user.next(user);
  //   localStorage.setItem("User", JSON.stringify(user));
  // }
}
