import { Component, OnInit } from '@angular/core';
import {AuthService} from "../login/auth.service";
import {FetchService} from "../fetch.service";
import {EventModel, EventType} from "../models/event.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data: EventModel[] = [];

  constructor(public authServ: AuthService, private fetchServ: FetchService) { }

  ngOnInit(): void {
    let today = new Date().toDateString()
    this.fetchServ.getEvents(this.authServ.user.getValue()!.userId).subscribe(val => {
      this.data = val.filter(value => (new Date(value.dateStart).toDateString()) === today);
    })
  }

  getColor(type: EventType): string {
    if (type === EventType.Birthday)
      return "limegreen";
    else if (type === EventType.Holiday)
      return "gold"
    else if (type === EventType.Reminder)
      return "crimson";
    else
      return "dodgerblue"
  }

  checkAllDay(start: string, end: string): boolean {
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (startDate.getHours() == 0
      && startDate.getMinutes() == 0
      && endDate.getHours() == 23
      && endDate.getMinutes() == 59) {
      return true;
    }

    return false;
  }

  getDate(str: string): Date {
    return new Date(str)
  }
}
