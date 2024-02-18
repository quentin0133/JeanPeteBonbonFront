import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css']
})
export class TimePickerComponent {
  times: string[] = [];
  value: string = new Date().toLocaleTimeString();

  onClickAddTime(): void {
    if (!this.value) return;
    this.times.push(this.value);
  }
}
