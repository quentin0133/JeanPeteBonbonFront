import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

function compareTime(time1: Date, time2: Date): boolean {
  return time1.getTime() === time2.getTime();
}

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: TimePickerComponent
    }
  ]
})
export class TimePickerComponent implements OnInit, ControlValueAccessor {
  @Input()
  times?: Date[];
  @Output()
  timesChange: EventEmitter<Date[]> = new EventEmitter<Date[]>();

  times$: Date[] = [];
  timeEntry: string = moment().format('HH:mm');

  isTouched = false;
  isDisabled = false;

  ngOnInit(): void {
    if (this.times) this.times$ = this.times;
  }

  writeValue(times: Date[]): void {
    this.times$ = times || [];
    this.timeEntry = moment().format('HH:mm');
    this.timesChange.emit(this.times$);
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  onChange = (times: Date[]) => {};

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.isTouched) {
      this.onTouched();
      this.isTouched = true;
    }
  }

  onTouched = () => {};

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onClickAddTime(): void {
    if (this.isDisabled) return;
    let timeEntryDate = moment(this.timeEntry, 'HH:mm').toDate();
    if (!this.timeEntry ||
      this.times$.some((time) => compareTime(time, timeEntryDate))) return;
    this.markAsTouched();

    this.times$.push(timeEntryDate);
    this.timesChange.emit(this.times$);
    this.onChange(this.times$);
  }

  onClickRemoveTime(index: number): void {
    if (this.isDisabled) return;
    if (index < 0 || index >= this.times$.length) return;
    this.markAsTouched();

    this.times$.splice(index, 1);
    this.timesChange.emit(this.times$);
    this.onChange(this.times$);
  }
}
