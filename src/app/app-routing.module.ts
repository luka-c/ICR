import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CalendarTableComponent} from "./calendar-table/calendar-table.component";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "calendar",
    component: CalendarTableComponent
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
