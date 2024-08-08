import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Guild } from '../../models/guild';
import {
  AbstractControl,
  FormControl,
  FormGroup, NgForm,
  Validators,
} from '@angular/forms';
import { ScheduleService } from '../../services/./schedule/schedule.service';
import {
  getFormControl,
  hasControlError,
  isControlInvalid,
} from 'src/tools/reactive-form-tools';
import {GuildService} from "../../services/guild/guild.service";

@Component({
  selector: 'app-event-modal-add',
  templateUrl: './event-modal-add.component.html',
  styleUrls: ['./event-modal-add.component.css'],
})
export class EventModalAddComponent implements OnInit {
  OVERFLOW_MULTIPLE_SELECTION: number = 5;

  @Input()
  isAlertAdd?: boolean;
  @Output()
  isAlertAddChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  onSave: EventEmitter<void> = new EventEmitter<void>();

  servers: Guild[] = [];

  isAlertAdd$: boolean = false;

  form: FormGroup = new FormGroup({
    id: new FormControl<number>(0),
    version: new FormControl<number>(0),
    serversId: new FormControl<number[]>([], [Validators.required]),
    message: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(512),
    ]),
    dates: new FormControl<Date[]>([], [Validators.required]),
    times: new FormControl<Date[]>([], [Validators.required]),
  });

  get serversSelected() {
    return this.servers.filter((server) =>
      {
        return this.serversId?.value.includes(server.id)
      }
    );
  }

  get serversId(): AbstractControl<any, any> | null {
    return this.form.get('serversId');
  }

  get message(): AbstractControl<any, any> | null {
    return this.form.get('message');
  }

  get dates(): AbstractControl<any, any> | null {
    return this.form.get('dates');
  }

  get times(): AbstractControl<any, any> | null {
    return this.form.get('times');
  }

  constructor(
    private scheduleService: ScheduleService,
    private guildService: GuildService
  ) {
    guildService.findAll().subscribe({
      next: (servers) => (this.servers = servers),
      error: (e) => console.log(e),
    });
  }

  ngOnInit() {
    if (this.isAlertAdd) this.isAlertAdd$ = this.isAlertAdd;
  }

  onSubmit(): void {
    if (this.form.valid) {
      (this.form.value.id
        ? this.scheduleService.update(this.form.value)
        : this.scheduleService.save(this.form.value)
      ).subscribe({
        next: _ => {
          this.scheduleService.findAll();
          this.close();
        },
        error: e => console.log(e),
      });
      this.close();
    }
  }

  onCancel(): void {
    this.close();
  }

  close(): void {
    this.form.reset({
      id: 0,
      version: 0,
      serversId: [],
      message: '',
      dates: [],
      times: [],
    });
    this.isAlertAdd = false;
    this.isAlertAddChange.emit(false);
  }

  getFormControl(name: string) {
    return getFormControl(this.form, name);
  }

  hasControlError = hasControlError;
  isControlInvalid = isControlInvalid;
}
