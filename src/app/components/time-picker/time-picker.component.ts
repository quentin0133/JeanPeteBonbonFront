import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Time } from '@angular/common';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css'],
})
export class TimePickerComponent {
  @Output()
  timesOnChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  times: string[] = [];
  timeEntry: string = new Date().toLocaleTimeString(navigator.language, {
    hour: '2-digit',
    minute: '2-digit',
  });

  onClickAddTime(): void {
    if (!this.timeEntry || this.times.includes(this.timeEntry)) return;
    this.times.push(this.timeEntry);
    this.timesOnChange.emit(this.times);
  }

  onClickRemoveTime(index: number): void {
    if (index < 0 || index >= this.times.length) return;
    this.times.splice(index, 1);
    this.timesOnChange.emit(this.times);
  }
}
