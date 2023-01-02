import {Component, OnInit, ViewChild} from '@angular/core';
import {CalendarOptions, CustomButtonInput} from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import {EventModel} from "../models/event.model";
import {AddModalComponent} from "../add-modal/add-modal.component";

@Component({
  selector: 'app-calendar-table',
  templateUrl: './calendar-table.component.html',
  styleUrls: ['./calendar-table.component.scss']
})
export class CalendarTableComponent implements OnInit {
  calendarOptions: CalendarOptions = {};
  data: EventModel[] = [];
  @ViewChild(AddModalComponent) modal!: AddModalComponent;

  constructor() { }

  ngOnInit(): void {
    this.data = [
      { title: 'Meeting', start: new Date() },
      { title: 'Birthday', start: new Date() }
    ];
    this.initOptions(this.data)
  }

  initOptions(data: EventModel[]) {
    this.calendarOptions = {
      //INITIAL OPTIONS
      plugins: [dayGridPlugin, timeGridPlugin],
      initialView: 'dayGridMonth',
      firstDay: 1,
      nowIndicator: true,

      //SLOT OPTIONS
      slotEventOverlap: true,
      allDaySlot: false,
      slotLabelFormat: {
        hour: 'numeric',
        minute: '2-digit',
        hour12: false
      },

      //EVENT OPTIONS
      eventTimeFormat: {
        hour: 'numeric',
        minute: '2-digit',
        hour12: false
      },

      //BUTTON AND HEADER OPTIONS
      customButtons: this.customButtons(),
      headerToolbar: {
        left: 'dayGridMonth,timeGridWeek,timeGridDay',
        center: 'title',
        right: 'add prev,next'
      },

      //DATA
      events: data
    };
  }

  customButtons(): {[p: string]: CustomButtonInput} {
    return {
      add: {
        text: '+',
        hint: 'Add a new event',
        click: () => {
          this.modal.isVisible.next(true);
        }
      }
    };
  }
}
