import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { ScheduleService } from '../../services/schedule-service/schedule.service';

export interface FilterType {
  label: string;
  variable: string;
  type: string;
}

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit, AfterViewChecked {
  private readonly debounceTimeMs = 400;

  private searchSubject = new Subject<string>();

  @ViewChild('dropdown') dropdown!: ElementRef;
  @ViewChild('searchBar') searchBar!: ElementRef;

  @Input()
  filters?: FilterType[];

  @Output()
  currentSelectedChange: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  searchBarChange: EventEmitter<string> = new EventEmitter<string>();
  searchText: string = '';

  isDropdownOpen: boolean = false;

  currentFilterSelected: FilterType = {
    label: '',
    type: 'text',
    variable: '',
  };

  constructor(
    private eRef: ElementRef,
    private scheduleService: ScheduleService,
  ) {}

  ngAfterViewChecked(): void {
    this.searchBar.nativeElement.style.paddingInlineEnd =
      (this.dropdown.nativeElement.clientWidth + 8) + 'px';
  }

  ngOnInit(): void {
    if (this.filters && this.filters?.length > 0)
      this.currentFilterSelected = this.filters[0];
    this.searchSubject
      .pipe(debounceTime(this.debounceTimeMs))
      .subscribe((searchValue) => {
        this.search(searchValue);
      });
  }

  onOpenDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onClickOut(event: any): void {
    if (!this.eRef.nativeElement.contains(event.target))
      this.isDropdownOpen = false;
  }

  setCurrentSelected(selected: string): void {
    if (!this.filters) return;

    this.currentFilterSelected = this.filters.filter(
      (filter) => filter.label === selected,
    )[0];
    this.currentSelectedChange.emit(selected);
    this.isDropdownOpen = false;
    this.search(this.searchText);
  }

  onSearch() {
    this.searchSubject.next(this.searchText);
  }

  search(searchValue: string) {
    if (!this.filters) return;
    let value = this.filters.filter(
      (filter) => filter.label === this.currentFilterSelected.label,
    )[0].variable;
    if (searchValue || !value)
      this.scheduleService.findByQuery(value, searchValue);
    else this.scheduleService.findAll();
  }
}
