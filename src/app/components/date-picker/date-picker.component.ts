import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatCalendar, MatCalendarCellCssClasses} from '@angular/material/datepicker';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

function compareDate(date1: Date, date2: Date): boolean {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: DatePickerComponent
    }
  ]
})
export class DatePickerComponent implements OnInit, ControlValueAccessor {
  @Input()
  dates?: Date[];
  @Output()
  datesChange: EventEmitter<Date[]> = new EventEmitter<Date[]>();

  // @ts-ignore
  @ViewChild('calendar') calendar: MatCalendar<Date>;

  dates$: Date[] = [];
  today: Date = new Date();

  isTouched = false;
  isDisabled = false;

  ngOnInit(): void {
    if (this.dates) this.dates$ = this.dates;
  }

  writeValue(dates: Date[]): void {
    this.dates$ = dates || [];
    this.datesChange.emit(this.dates$);
    this.calendar?.updateTodaysDate();
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  onChange = (dates: Date[]) => {};

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

  initDates() {
    return (event: any): MatCalendarCellCssClasses => {
      return this.dates$.some((date) => compareDate(date, event.toDate()))
        ? 'selected-date'
        : '';
    };
  }

  onClickDate(event: any): void {
    if (this.isDisabled) return;
    this.markAsTouched();

    const newDate = event.toDate();
    const index = this.dates$.findIndex((date) => compareDate(date, newDate));

    if (index === -1) this.dates$.push(newDate);
    else this.dates$.splice(index, 1);

    this.calendar.updateTodaysDate();
    this.datesChange.emit(this.dates$);
    this.onChange(this.dates$);
  }

  onClearButton(calendar: any): void {
    this.writeValue([]);
    this.onChange(this.dates$);
  }
}
