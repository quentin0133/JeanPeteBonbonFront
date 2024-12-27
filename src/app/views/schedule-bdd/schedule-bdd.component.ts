import { Component, OnInit, ViewChild } from '@angular/core';
import { Schedule } from 'src/app/models/schedule';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';
import { Observable, of, Subject } from 'rxjs';
import { FilterType } from '../../components/search-bar/search-bar.component';
import { TbodyComponent } from '../../components/table/tbody/tbody.component';

@Component({
  selector: 'app-schedule-bdd',
  templateUrl: './schedule-bdd.component.html',
  styleUrls: ['./schedule-bdd.component.css'],
})
export class ScheduleBDDComponent {
  schedulesObservable: Observable<Schedule[]> = of([]);

  isAlertAdd: boolean = false;
  isAlertDelete: boolean = false;

  idsChecked: number[] = [];
  toggleAllCheckboxEvent: Subject<void> = new Subject<void>();

  clearCheckbox: Subject<void> = new Subject<void>();

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
    this.schedulesObservable = this.scheduleService.findAll();
  }

  onWantAdd(): void {
    this.isAlertAdd = true;
  }

  onWantDeleteSelection(): void {
    this.isAlertDelete = true;
  }

  /**
   * Delete all the selected checkbox
   */
  onDeleteSelected(): void {
    this.isAlertDelete = false;
    this.deleteSelection();
    this.idsChecked = [];
  }

  deleteSelection(): void {
    for (let id of this.idsChecked)
      this.scheduleService
        .delete(id)
        .subscribe((_) => this.scheduleService.findAll());
  }

  protected readonly String = String;
  protected readonly console = console;
  protected readonly onkeydown = onkeydown;
  protected readonly Boolean = Boolean;
}
