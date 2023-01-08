import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {User} from "../models/user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  isLogin: boolean = true;
  error: string | undefined;

  constructor(private authService: AuthService, private router: Router) { }

  toggle() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;

    const email = form.value.email;
    const password = form.value.password;
    this.error = undefined;
    let errorString = "";

    let authObservable: Observable<User>;
    if (!this.isLogin) {
      errorString = "Email already exists";
      const name = form.value.name;
      const surname = form.value.surname;
      authObservable = this.authService.signup(email, password, name, surname);
    }
    else {
      errorString = "Invalid credentials";
      authObservable = this.authService.login(email, password);
    }

    authObservable.subscribe({
      next: (respData) => {
        if (respData === null)
          throw new Error(errorString)
        else
          this.router.navigate(['/']);
      },
      error: (error) => {
        this.error = error;
      }
    });

    form.reset();
  }
}
