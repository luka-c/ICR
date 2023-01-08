import {Component, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {FetchService} from "../fetch.service";
import {AuthService} from "../login/auth.service";
import {EventModel} from "../models/event.model";

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {
  isVisible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isEditable: boolean = false;
  form!: FormGroup;
  currentEvent: EventModel | undefined;
  error: string | undefined;

  constructor(private fetchService: FetchService, private authService: AuthService) { }

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.form = new FormGroup({
      "name": new FormControl({ value: "", disabled: !this.isEditable }, Validators.required),
      "dateStart": new FormControl({ value: "", disabled: !this.isEditable }, Validators.required),
      "dateEnd": new FormControl({ value: "", disabled: !this.isEditable }, Validators.required),
      "userId": new FormControl(this.authService.user.getValue()!.userId, Validators.required),
      "recurringId": new FormControl({ value: null, disabled: !this.isEditable }),
      "eventTypeId": new FormControl({ value: null, disabled: !this.isEditable }, Validators.required),
      "description": new FormControl({ value: "", disabled: !this.isEditable }, Validators.required)
    })
  }

  fillForm(event: EventModel) {
    this.currentEvent = event;

    this.form.patchValue({
      name: event.name,
      dateStart: this.formatDate(event.dateStart),
      dateEnd: this.formatDate(event.dateEnd),
      recurringId: event.recurringId,
      eventTypeId: event.eventTypeId,
      description: event.description
    })
  }

  editEvent() {
    this.error = undefined;

    if (this.form.get("dateEnd")! < this.form.get("dateStart")!) {
      this.error = "Start date cannot be greater than end date."
      return;
    }
    this.fetchService.editEvent(this.form.value).subscribe(value => {
      if (value) {
        this.isVisible.next(false);
        window.location.reload();
      }
    })
  }

  formatDate(oldDate: string): string {
    const date = (new Date(oldDate)).toISOString();
    const sliceIndex = date.lastIndexOf(':');
    return date.slice(0, sliceIndex);
  }

  toggleEdit() {
    this.isEditable = !this.isEditable;

    if (this.isEditable) {
      this.form.enable()
    }
    else {
      this.form.disable()
    }
  }

  cancel() {
    this.fillForm(this.currentEvent!)
    this.toggleEdit();
  }

  delete() {
    this.fetchService.deleteEvent(this.currentEvent!.eventId).subscribe(value => {
      if (value) {
        this.isVisible.next(false);
        window.location.reload();
      }
    });
  }
}
