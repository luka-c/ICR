import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {Observable} from "rxjs";
import {AuthResponseData} from "../models/auth-response.model";
import {AuthService} from "./auth.service";

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

    // let authObservable: Observable<AuthResponseData>;
    // if (!this.isLogin) {
    //   //authObservable = this.authService.signup(email, password);
    // }
    // else {
    //   //authObservable = this.authService.login(email, password);
    // }
    //
    // authObservable.subscribe({
    //   next: (respData) => {
    //     console.log(respData);
    //     this.router.navigate(['/']);
    //   },
    //   error: (error) => {
    //     this.error = error;
    //   }
    // });

    form.reset();
  }
}
