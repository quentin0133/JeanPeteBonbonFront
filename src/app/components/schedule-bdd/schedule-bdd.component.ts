import { Component, EventEmitter } from '@angular/core';
import { Schedule } from 'src/app/models/schedule';
import { ScheduleService } from 'src/app/services/schedule-service/schedule.service';

@Component({
  selector: 'app-schedule-bdd',
  templateUrl: './schedule-bdd.component.html',
  styleUrls: ['./schedule-bdd.component.css']
})
export class ScheduleBDDComponent {
  checkboxAllChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  schedules: Schedule[];
  idSchedulesChecked: (number | undefined)[];

  isAlertAdd: boolean;
  isAlertDelete: boolean;

  constructor(private scheduleService: ScheduleService) {
    this.schedules = this.scheduleService.findAll();
    this.idSchedulesChecked = [];

    this.isAlertAdd = false;
    this.isAlertDelete = false;
  }

  onChangeAllCheckbox(event: Event): void {
    // @ts-ignore
    if (event.target?.checked) this.addAllScheduleSelected();
    else this.clearScheduleSelected();
  }

  onChangeCheckbox(event: Event, id: number | undefined): void {
    // @ts-ignore
    if (event.target?.checked) this.addScheduleSelected(id);
    else this.removeScheduleSelected(id);
  }

  onWantAdd(): void {
    this.isAlertAdd = true;
  }

  onCancelAdd(): void {
    this.isAlertAdd = false;
  }

  onWantDelete(id: number | undefined): void {
    this.clearScheduleSelected();
    this.addScheduleSelected(id);
    this.isAlertDelete = true;
  }

  onWantDeleteSelected(): void {
    this.isAlertDelete = true;
  }

  onCancelDelete(): void {
    this.isAlertDelete = false;
    this.clearScheduleSelected();
  }

  /**
   * Delete all the selected checkbox
   */
  onDeleteSelected(): void {
    this.isAlertDelete = false;
    this.deleteSelected();
    this.clearScheduleSelected();
  }

  addScheduleSelected(id: number | undefined): void {
    if (!this.idSchedulesChecked.includes(id)) this.idSchedulesChecked.push(id);
  }

  removeScheduleSelected(id: number | undefined): void {
    this.idSchedulesChecked.splice(this.idSchedulesChecked.indexOf(id), 1);
  }

  addAllScheduleSelected(): void {
    this.idSchedulesChecked = this.schedules.map((schedule) => schedule.id);
  }

  clearScheduleSelected(): void {
    this.idSchedulesChecked = [];
  }

  deleteSelected(): void {
    for (let id of this.idSchedulesChecked) {
      if (this.scheduleService.delete(id))
        console.log('Succès de la suppression n°' + id);
      else console.log('Echec de la suppression n°' + id);
    }
  }
}
