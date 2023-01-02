import {Component} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss']
})
export class AddModalComponent {
  isVisible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }
}
