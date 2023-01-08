import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EventModel} from "./models/event.model";

@Injectable({
  providedIn: 'root'
})
export class FetchService {
  private host: string = "http://localhost:8080/"

  constructor(private http: HttpClient) { }

  getEvents(user_id: number) {
    return this.http.get<EventModel[]>(this.host + "getEvents/" + user_id)
  }

  postEvent(event: Omit<EventModel, "eventId">) {

    return this.http.post<boolean>(this.host + "insertEvent", event)
  }

  editEvent(event: EventModel) {
    return this.http.put(this.host + "editEvent/", event);
  }

  deleteEvent(id: number) {
    return this.http.delete(this.host + "deleteEvent/" + id)
  }
}
