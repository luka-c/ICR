import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CalendarTableComponent} from "./calendar-table/calendar-table.component";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./auth.guard";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "calendar",
    component: CalendarTableComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "login",
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
