import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Schedule } from 'src/app/models/schedule';

function toDate(date: Date, time: Date) {
  return new Date(
    `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${time.getHours()}:${time.getMinutes()}`,
  );
}

function get2DArrayTo1DArray(arrays: any[][]): any[] {
  let newArr: any[] = [];
  arrays.forEach((array, i) => {
    newArr = newArr.concat(array);
  });
  return newArr;
}

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

  message: string = '';

  dates: Date[] = [];
  times: Date[] = [];
  isAlertAdd$: boolean = false;

  ngOnInit() {
    if (this.isAlertAdd) this.isAlertAdd$ = this.isAlertAdd;
  }

  onSubmit(): void {
    if (
      this.dates.length > 0 &&
      this.times.length > 0 &&
      this.message.length > 0
    )
      console.log(this.toSchedule(this.message, this.dates, this.times));
  }

  toSchedule(message: string, dates: Date[], times: Date[]): Schedule[] {
    return get2DArrayTo1DArray(
      dates.map((date) =>
        times.map((time) => {
          return {
            message: message,
            dateTime: toDate(date, time),
          };
        }),
      ),
    );
  }

  onCancel(): void {
    this.isAlertAdd = false;
    this.isAlertAddChange.emit(this.isAlertAdd);
  }
}
