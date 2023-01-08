import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post("http://localhost:8080/login",
      { email: email, password: password
    })
    .pipe(tap(data => {
      this.authenticate(data);
    }))
  }

  signup(email: string, password: string, name: string, surname: string): Observable<any> {
    return this.http.post("http://localhost:8080/register",
      {
        email: email,
        password: password,
        name: name,
        surname: surname
    }, {
      headers: { "Access-Control-Allow-Origin": "*" }
      })
    .pipe( tap(data => {
      this.authenticate(data);
    }))
  }

  logout() {
    this.user.next(undefined);
    localStorage.clear();
    this.router.navigate(["/login"]);
  }

  autoLogin() {
    const userData: User = JSON.parse(localStorage.getItem("User")!);
    if (!userData) return;
    const storedUser = userData;
    this.user.next(storedUser);
  }


  private authenticate(user: any) {
    this.user.next(user);
    localStorage.setItem("User", JSON.stringify(user));
  }
}
