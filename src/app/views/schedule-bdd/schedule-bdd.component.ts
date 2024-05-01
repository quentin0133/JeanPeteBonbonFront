import { Component, EventEmitter } from '@angular/core';
import { Schedule } from 'src/app/models/schedule';
import { ScheduleService } from 'src/app/services/schedule-service/schedule.service';
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-schedule-bdd',
  templateUrl: './schedule-bdd.component.html',
  styleUrls: ['./schedule-bdd.component.css'],
})
export class ScheduleBDDComponent {
  schedules: Schedule[] = [];
  schedulesAll: Observable<Schedule[]> = of([]);
  idSchedulesChecked: number[] = [];

  isAlertAdd: boolean = false;
  isAlertDelete: boolean = false;

  constructor(private scheduleService: ScheduleService) {
    this.schedulesAll = this.scheduleService.findAll()
    this.schedulesAll.subscribe(schedules => this.schedules = schedules);
  }

  onChangeAllCheckbox(event: any): void {
    if (event.target?.checked) this.addAllScheduleSelected();
    else this.clearScheduleSelected();
  }

  isChecked(id: number) : boolean {
    return this.idSchedulesChecked.includes(id);
  }

  onChangeCheckbox(id: number): void {
    if (this.isChecked(id)) this.addScheduleSelected(id);
    else this.removeScheduleSelected(id);
  }

  onWantAdd(): void {
    this.isAlertAdd = true;
  }

  onWantDelete(id: number): void {
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

  addScheduleSelected(id: number): void {
    if (!this.idSchedulesChecked.includes(id)) this.idSchedulesChecked.push(id);
  }

  removeScheduleSelected(id: number): void {
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
