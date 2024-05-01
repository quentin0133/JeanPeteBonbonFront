import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Schedule } from 'src/app/models/schedule';
import {BotService} from "../../services/bot-service/bot.service";
import {Server} from "../../models/server";
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {getFormControl, hasControlError, isControlInvalid } from '../tools/reactive-form-tools';
import {ScheduleService} from "../../services/schedule-service/schedule.service";

function toDate(date: Date, time: Date) {
  return new Date(
    `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${time.getHours()}:${time.getMinutes()}`,
  );
}

function get2DArrayTo1DArray(arrays: any[][]): any[] {
  let newArr: any[] = [];
  arrays.forEach((array, i) => {
    newArr = newArr.concat(array);
  });
  return newArr;
}

@Component({
  selector: 'app-event-modal-add',
  templateUrl: './event-modal-add.component.html',
  styleUrls: ['./event-modal-add.component.css']
})
export class EventModalAddComponent implements OnInit {
  @Input()
  isAlertAdd?: boolean;
  @Output()
  isAlertAddChange: EventEmitter<boolean> = new EventEmitter();

  servers: Server[];

  form: FormGroup = new FormGroup({
    id: new FormControl<number>(0),
    version: new FormControl<number>(0),
    serversId: new FormControl<number[]>([], Validators.required),
    message: new FormControl<string>('', [Validators.required, Validators.maxLength(512)]),
    dates: new FormControl<Date[]>([], [Validators.required]),
    times: new FormControl<Date[]>([], [Validators.required])
  });

  isAlertAdd$: boolean = false;

  get serversSelected() {
    return this.servers.filter(server => this.serversId?.value.includes(server.id));
  }

  get serversId(): AbstractControl<any, any> | null {
    return this.form.get('serversId');
  }

  get message(): AbstractControl<any, any> | null {
    return this.form.get('message')
  }

  get dates(): AbstractControl<any, any> | null {
    return this.form.get('dates')
  }

  get times(): AbstractControl<any, any> | null {
    return this.form.get('times')
  }

  constructor(private botService: BotService, private scheduleService: ScheduleService) {
    this.servers = botService.findAllServer()
  }

  ngOnInit() {
    if (this.isAlertAdd) this.isAlertAdd$ = this.isAlertAdd;
  }

  onSubmit(): void {
    if (this.form.valid) {
      (this.form.value.id ?
        this.scheduleService.update(this.form.value) :
        this.scheduleService.save(this.form.value)).subscribe();
      this.close();
    }
  }

  mergeDateAndTime(dates: Date[], times: Date[]): Schedule[] {
    return get2DArrayTo1DArray(
      dates.map((date) =>
        times.map((time) => {
          return toDate(date, time);
        }),
      ),
    );
  }

  onCancel(): void {
    this.form.reset();
    this.close();
  }

  close(): void {
    this.isAlertAdd = false;
    this.isAlertAddChange.emit(this.isAlertAdd);
  }

  getFormControl(name: string) {
    return getFormControl(this.form, name)
  }

  hasControlError = hasControlError
  isControlInvalid = isControlInvalid
}
