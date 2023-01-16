import {Component, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {FetchService} from "../fetch.service";
import {NgForm} from "@angular/forms";
import {AuthService} from "../login/auth.service";

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss']
})
export class AddModalComponent implements OnInit{
  isVisible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  @ViewChild('eventForm', { static: true }) form!: NgForm;
  error: string | undefined;
  recurringType: string | null = null;
  eventType: number = 0;

  constructor(private fetchService: FetchService, private authService: AuthService) { }

  ngOnInit() {
    this.isVisible.subscribe(val => {
      if (val === false)
        this.form.reset()
    })
  }

  addEvent(form: NgForm) {
    this.error = undefined;

    if (form.value.dateEnd < form.value.dateStart) {
      this.error = "Start date cannot be greater than end date."
      return;
    }

    this.fetchService.postEvent({
      name: form.value.name,
      dateStart: form.value.dateStart,
      dateEnd: form.value.dateEnd,
      userId: this.authService.user.getValue()!.userId,
      recurringTypeId: parseInt(form.value.recurringTypeId),
      eventTypeId: parseInt(form.value.eventTypeId),
      description: form.value.description
    }).subscribe((val) => {
      if (val) {
        this.isVisible.next(false)
        window.location.reload();
      }
    })

  }
}
