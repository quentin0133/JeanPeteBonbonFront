import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { LoadingState } from '../../../pipes/loading-state/loading-state.pipe';
import { onlyUnique } from '../../../../tools/array';
import { Schedule } from '../../../models/schedule';
import { ScheduleService } from '../../../services/schedule/schedule.service';

@Component({
  selector: 'app-tbody',
  templateUrl: './tbody.component.html',
  styleUrls: ['./tbody.component.css'],
})
export class TbodyComponent implements OnInit, OnDestroy {
  @Input() schedules: LoadingState<Schedule[]> = { loading: true };

  @Output() wantDelete: EventEmitter<number[]> = new EventEmitter<number[]>();

  @Input() idsChecked: number[] = [];
  @Output() idsCheckedChange: EventEmitter<number[]> = new EventEmitter<
    number[]
  >();

  @Input() toggleAllCheckboxEvent: Subject<void> = new Subject<void>();
  @Input() clearCheckboxEvent: Subject<void> = new Subject<void>();

  private toggleAllCheckboxSubscription: Subscription = new Subscription();
  private clearCheckboxSubscription: Subscription = new Subscription();

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.toggleAllCheckboxSubscription.add(
      this.toggleAllCheckboxEvent.subscribe(() => this.toggleAllCheckbox()),
    );
    this.clearCheckboxSubscription.add(
      this.clearCheckboxEvent.subscribe(() => this.clearCheckbox()),
    );
  }

  ngOnDestroy(): void {
    this.toggleAllCheckboxSubscription.unsubscribe();
    this.clearCheckboxSubscription.unsubscribe();
  }

  getError(error: Error) {
    // @ts-ignore
    return error.error.message;
  }

  toggleAllCheckbox(): void {
    let idsElement: number[] | undefined = this.schedules.data
      ?.map((elmt) => elmt.id)
      .filter(onlyUnique);
    if (idsElement && this.idsChecked.length < idsElement.length) {
      this.idsChecked = idsElement;
      this.idsCheckedChange.emit(this.idsChecked);
    } else {
      this.clearCheckbox();
    }
  }

  isChecked(id: number): boolean {
    return this.idsChecked.includes(id);
  }

  check(id: number): void {
    if (this.idsChecked.includes(id)) return;
    this.idsChecked.push(id);
    this.idsCheckedChange.emit(this.idsChecked);
  }

  uncheck(id: number): void {
    this.idsChecked.splice(this.idsChecked.indexOf(id), 1);
    this.idsCheckedChange.emit(this.idsChecked);
  }

  clearCheckbox(): void {
    this.idsChecked = [];
    this.idsCheckedChange.emit(this.idsChecked);
  }

  onChangeCheckbox(id: number): void {
    if (this.isChecked(id)) this.uncheck(id);
    else this.check(id);
  }

  refreshData(): void {
    this.scheduleService.refresh();
  }

  onWantDeleteById(id: number): void {
    this.clearCheckbox();
    this.check(id);
    this.wantDelete.emit(this.idsChecked);
  }
}
