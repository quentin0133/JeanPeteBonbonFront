import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Schedule } from '../../../models/schedule';

@Component({
  selector: 'app-theader',
  templateUrl: './theader.component.html',
  styleUrls: ['./theader.component.css'],
})
export class TheaderComponent {
  @Input() elements!: Schedule[] | undefined;
  @Input() allChecked: boolean = false;
  @Input() headers!: HeaderTable[];

  @Output() toggleAllCheckbox: EventEmitter<void> = new EventEmitter<void>();
}

export interface HeaderTable {
  label: string;
  className: string;
}
