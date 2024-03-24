import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
})
export class DatePickerComponent {
  @Output()
  datesChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  dates: string[];
  today: Date;

  constructor() {
    this.dates = [];
    this.today = new Date();
  }

  getSelectedDates() {
    return (event: any): MatCalendarCellCssClasses => {
      console.log(event);
      return this.dates.some((date) => date === event.format('YYYY-MM-DD'))
        ? 'selected-date'
        : '';
    };
  }

  onSelectDate(event: any, calendar: any): void {
    const newDate: string = event.format('YYYY-MM-DD');
    const index = this.dates.findIndex((date) => date === newDate);

    if (index === -1) this.dates.push(newDate);
    else this.dates.splice(index, 1);

    calendar.updateTodaysDate();
    this.datesChange.emit(this.dates);
  }

  onClearButton(calendar: any): void {
    this.dates = [];
    calendar.updateTodaysDate();
  }
}
