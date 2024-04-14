import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';

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
})
export class DatePickerComponent implements OnInit {
  @Input()
  dates?: Date[];
  @Output()
  datesChange: EventEmitter<Date[]> = new EventEmitter<Date[]>();

  dates$: Date[] = [];
  today: Date = new Date();

  ngOnInit(): void {
    if (this.dates) this.dates$ = this.dates;
  }

  getSelectedDates() {
    return (event: any): MatCalendarCellCssClasses => {
      return this.dates$.some((date) => compareDate(date, event.toDate()))
        ? 'selected-date'
        : '';
    };
  }

  onSelectDate(event: any, calendar: any): void {
    const newDate = event.toDate();
    const index = this.dates$.findIndex((date) => compareDate(date, newDate));

    if (index === -1) this.dates$.push(newDate);
    else this.dates$.splice(index, 1);

    calendar.updateTodaysDate();
    this.datesChange.emit(this.dates$);
  }

  onClearButton(calendar: any): void {
    this.dates$ = [];
    calendar.updateTodaysDate();
  }
}
