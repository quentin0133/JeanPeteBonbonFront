import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';

function compareTime(time1: Date, time2: Date): boolean {
  return time1.getTime() === time2.getTime();
}

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css'],
})
export class TimePickerComponent implements OnInit {
  @Input()
  times?: Date[];
  @Output()
  timesChange: EventEmitter<Date[]> = new EventEmitter<Date[]>();

  times$: Date[] = [];
  timeEntry: string = moment().format('HH:mm');

  ngOnInit(): void {
    if (this.times) this.times$ = this.times;
  }

  onClickAddTime(): void {
    let timeEntryDate = moment(this.timeEntry, 'HH:mm').toDate();
    if (
      !this.timeEntry ||
      this.times$.some((time) => compareTime(time, timeEntryDate))
    )
      return;
    console.log(timeEntryDate);
    this.times$.push(timeEntryDate);
    this.timesChange.emit(this.times$);
  }

  onClickRemoveTime(index: number): void {
    if (index < 0 || index >= this.times$.length) return;
    this.times$.splice(index, 1);
    this.timesChange.emit(this.times$);
  }
}
