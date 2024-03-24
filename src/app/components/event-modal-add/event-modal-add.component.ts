import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Schedule } from 'src/app/models/schedule';

@Component({
  selector: 'app-event-modal-add',
  templateUrl: './event-modal-add.component.html',
  styleUrls: ['./event-modal-add.component.css'],
})
export class EventModalAddComponent implements OnInit {
  @Input()
  isAlertAdd?: boolean;
  @Output()
  isAlertAddChange: EventEmitter<boolean> = new EventEmitter();

  message: string;

  dates$: string[];
  times$: string[];
  isAlertAdd$: boolean;

  constructor() {
    this.message = '';
    this.dates$ = [];
    this.times$ = [];
    this.isAlertAdd$ = false;
  }

  ngOnInit() {
    if (this.isAlertAdd) this.isAlertAdd$ = this.isAlertAdd;
  }

  onSubmit(): void {
    console.log(this.toSchedule(this.message, this.dates$, this.times$));
  }

  toSchedule(message: string, dates: string[], times: string[]): Schedule[] {
    return this.get2DArrayTo1DArray(
      dates.map((date) =>
        times.map((time) => {
          return {
            message: message,
            dateTime: new Date(`${date} ${time}`),
          };
        }),
      ),
    );
  }

  get2DArrayTo1DArray = (arrays: any[][]) => {
    let newArr: any[] = [];
    arrays.forEach((array, i) => {
      newArr = newArr.concat(array[i]);
    });
    return newArr;
  };

  onCancel(): void {
    this.isAlertAdd = false;
    this.isAlertAddChange.emit(this.isAlertAdd);
  }

  setDates($event: string[]) {
    this.dates$ = $event;
  }

  setTimes($event: string[]) {
    this.times$ = $event;
  }
}
