import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AuthService} from "../login/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed: boolean = true;
  isAuthenticated: boolean = false;
  private userSubscription: Subscription | undefined;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // this.userSubscription = this.authService.user.subscribe(user => {
    //   this.isAuthenticated = !!user;
    // });
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

}
