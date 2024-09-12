import { Component } from '@angular/core';
import { Schedule } from 'src/app/models/schedule';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';
import { Observable, of } from 'rxjs';
import { FilterType } from '../../components/search-bar/search-bar.component';

@Component({
  selector: 'app-schedule-bdd',
  templateUrl: './schedule-bdd.component.html',
  styleUrls: ['./schedule-bdd.component.css'],
})
export class ScheduleBDDComponent {
  schedules: Observable<Schedule[]> = of([]);
  idSchedulesChecked: number[] = [];

  isAlertAdd: boolean = false;
  isAlertDelete: boolean = false;

  filters: FilterType[] = [
    {
      label: 'Id',
      variable: 'id',
      type: 'number',
    },
    {
      label: 'Message',
      variable: 'message',
      type: 'string',
    },
    {
      label: 'Date',
      variable: 'dates',
      type: 'date',
    },
    {
      label: 'Temps',
      variable: 'times',
      type: 'time',
    },
  ];

  constructor(private scheduleService: ScheduleService) {
    this.schedules = this.scheduleService.getSchedules();
    this.scheduleService.findAll();
  }

  onChangeAllCheckbox(event: any, all: Schedule[]): void {
    console.error('A');
    if (event.target?.checked) this.addAllScheduleSelected(all);
    else this.clearSelection();
  }

  onChangeCheckbox(id: number): void {
    if (this.isChecked(id)) this.addScheduleSelected(id);
    else this.removeScheduleSelected(id);
  }

  onWantAdd(): void {
    this.isAlertAdd = true;
  }

  onWantDeleteById(id: number): void {
    this.clearSelection();
    this.addScheduleSelected(id);
    this.onWantDeleteSelection();
  }

  onWantDeleteSelection(): void {
    this.isAlertDelete = true;
  }

  onCancelDelete(): void {
    this.isAlertDelete = false;
    this.clearSelection();
  }

  /**
   * Delete all the selected checkbox
   */
  onDeleteSelected(): void {
    this.isAlertDelete = false;
    this.deleteSelection();
    this.clearSelection();
  }

  isChecked(id: number): boolean {
    return this.idSchedulesChecked.includes(id);
  }

  addScheduleSelected(id: number): void {
    if (!this.idSchedulesChecked.includes(id)) this.idSchedulesChecked.push(id);
  }

  removeScheduleSelected(id: number): void {
    this.idSchedulesChecked.splice(this.idSchedulesChecked.indexOf(id), 1);
  }

  addAllScheduleSelected(all: Schedule[]): void {
    this.idSchedulesChecked = all.map((schedule) => schedule.id);
  }

  clearSelection(): void {
    this.idSchedulesChecked = [];
  }

  deleteSelection(): void {
    for (let id of this.idSchedulesChecked)
      this.scheduleService
        .delete(id)
        .subscribe((_) => this.scheduleService.findAll());
  }

  protected readonly String = String;
  protected readonly console = console;
}
