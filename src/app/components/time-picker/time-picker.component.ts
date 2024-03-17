import { Component } from '@angular/core';
import {Time} from "@angular/common";

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css']
})
export class TimePickerComponent {
  times: Time[];
  value: string;

  constructor() {
    this.times = [];
    this.value = new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
  }

  onClickAddTime(): void {
    if (!this.value) return;

    let timeString = this.value.split(':');
    let time = {
      hours: +timeString[0],
      minutes: +timeString[1]
    }

    if (this.times.includes(time)) return;

    this.times.push(time);
  }
}
