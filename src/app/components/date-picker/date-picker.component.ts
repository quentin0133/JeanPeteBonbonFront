import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  MatCalendarCellCssClasses,
  MatDatepicker,
  MatDatepickerInputEvent,
} from '@angular/material/datepicker';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
})
export class DatePickerComponent {
  dates: Date[] = [];

  getToday() {
    return new Date();
  }

  getSelectedDates() {
    return (event: Date): MatCalendarCellCssClasses => {
      const newDate = new Date(event);
      const highlightDate = this.dates.some(
        (date) => date.getDate() === newDate.getDate() && date.getMonth() === newDate.getMonth() && date.getFullYear() === newDate.getFullYear()
      );

      return highlightDate ? 'selected-date' : '';
    };
  }

  onSelectDate(event: any, calendar: any): void {
    const newDate = new Date(event._d);
    const index = this.dates.findIndex(
      (date) => date.getDate() === newDate.getDate() && date.getMonth() === newDate.getMonth() && date.getFullYear() === newDate.getFullYear()
    );
    if (index === -1) this.dates.push(newDate);
    else this.dates.splice(index, 1);
    calendar.updateTodaysDate();
  }

  onClearButton(calendar: any): void {
    this.dates = [];
    calendar.updateTodaysDate();
  }
}
