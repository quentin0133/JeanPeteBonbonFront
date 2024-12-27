import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-event-modal-delete',
  templateUrl: './event-modal-delete.component.html',
  styleUrls: ['./event-modal-delete.component.css'],
})
export class EventModalDeleteComponent {
  @Input() isAlertDelete?: boolean;
  @Input() idsChecked: number[] = [];
  @Output() isAlertDeleteChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() clearCheckbox: EventEmitter<void> = new EventEmitter<void>();
  @Output() onDeleteSelected: EventEmitter<void> = new EventEmitter<void>();

  onCancelDelete(): void {
    this.isAlertDelete = false;
    this.isAlertDeleteChange.emit(this.isAlertDelete);
    this.clearCheckbox.emit();
  }
}
