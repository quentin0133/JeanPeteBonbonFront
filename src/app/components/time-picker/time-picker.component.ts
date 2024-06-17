import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

function compareTime(time1: Date, time2: Date): boolean {
  return time1.getTime() === time2.getTime();
}

function dateStringToDateTime(dateString: string) {
  const [hours, minutes] = dateString.split(':').map(Number);
  const now = new Date();
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes,
  );
}

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: TimePickerComponent,
    },
  ],
})
export class TimePickerComponent implements OnInit, ControlValueAccessor {
  timeFormat: Intl.DateTimeFormat = new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  @Input()
  times?: Date[];
  @Output()
  timesChange: EventEmitter<Date[]> = new EventEmitter<Date[]>();

  times$: Date[] = [];
  timeEntry: string = this.timeFormat.format(new Date());

  isTouched = false;
  isDisabled = false;

  ngOnInit(): void {
    if (this.times) this.times$ = this.times;
  }

  writeValue(times: Date[]): void {
    this.times$ = times || [];
    this.timeEntry = this.timeFormat.format(new Date());
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

    const timeEntryDate = dateStringToDateTime(this.timeEntry);

    if (
      !this.timeEntry ||
      this.times$.some((time) => compareTime(time, timeEntryDate))
    )
      return;
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
