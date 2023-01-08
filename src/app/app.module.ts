import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarTableComponent } from './calendar-table/calendar-table.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import {HttpClientModule} from "@angular/common/http";
import {FullCalendarModule} from "@fullcalendar/angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AddModalComponent } from './add-modal/add-modal.component';
import { HomeComponent } from './home/home.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    CalendarTableComponent,
    LoginComponent,
    HeaderComponent,
    AddModalComponent,
    HomeComponent,
    EditModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FullCalendarModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
