import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {CalendarOptions, CustomButtonInput, EventClickArg, EventInput} from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import {EventModel, EventType} from "../models/event.model";
import {AddModalComponent} from "../add-modal/add-modal.component";
import {FetchService} from "../fetch.service";
import {AuthService} from "../login/auth.service";
import {EditModalComponent} from "../edit-modal/edit-modal.component";

@Component({
  selector: 'app-calendar-table',
  templateUrl: './calendar-table.component.html',
  styleUrls: ['./calendar-table.component.scss']
})
export class CalendarTableComponent implements OnInit {
  calendarOptions: CalendarOptions = {};
  events: EventInput[] | undefined;
  rawEventValues: EventModel[] = [];
  @ViewChild(AddModalComponent) addModal!: AddModalComponent;
  @ViewChild(EditModalComponent) editModal!: EditModalComponent;

  constructor(private fetchService: FetchService, private authServ: AuthService) { }

  ngOnInit(): void {
    this.fetchService.getEvents(this.authServ.user.getValue()!.userId)
      .subscribe((res) => {
        this.rawEventValues = res;
        this.events = this.formatData(res);
        this.initOptions(this.events.length > 0 ? this.events : []);
    })
  }

  initOptions(data: EventInput[]) {
    const rawValues = this.rawEventValues;
    const modal = this.editModal;

    this.calendarOptions = {
      events: data,
      eventClick: function (info) {
        const clickedEvent = rawValues.find(event => event.eventId.toString() === info.event.id);

        if (clickedEvent) {
          modal.fillForm(clickedEvent);
          modal.isVisible.next(true);
        }
      },

      //INITIAL OPTIONS
      plugins: [dayGridPlugin, timeGridPlugin],
      initialView: 'dayGridMonth',
      firstDay: 1,
      nowIndicator: true,
      expandRows: true,

      //SLOT OPTIONS
      slotEventOverlap: true,
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
      }
    };

    if (window.innerWidth < 800) {
      this.calendarOptions.contentHeight = "auto";
    }
  }

  customButtons(): {[p: string]: CustomButtonInput} {
    return {
      add: {
        text: '+',
        hint: 'Add a new event',
        click: () => {
          this.addModal.isVisible.next(true);
        }
      }
    };
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    if (window.innerWidth < 800) {
      this.calendarOptions.contentHeight = "auto";
    }
    else {
      this.calendarOptions.contentHeight = undefined;
    }
  }

  formatData(data: EventModel[]): EventInput[] {
    let retData: EventInput[] = [];
    data.forEach((event) => {
      retData.push(
        {
          id: event.eventId.toString(),
          title: event.name,
          start: new Date(event.dateStart),
          end: new Date(event.dateEnd),
          allDay: this.checkAllDay(new Date(event.dateStart), new Date(event.dateEnd)),
          editable: false,
          backgroundColor: this.getColor(event.eventTypeId),
          borderColor: this.getColor(event.eventTypeId)
      })
    })

    return retData;
  }

  checkAllDay(start: Date, end: Date): boolean {
    return start.getHours() === 0
      && start.getMinutes() === 0
      && end.getHours() === 23
      && end.getMinutes() === 59;
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
}
