import { Injectable } from '@angular/core';
import { Schedule } from '../../models/schedule';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  schedules: Schedule[] = [
    {
      id: 1,
      version: 0,
      message: "Bonjour Michel, c'est moi Jane Doe",
      dateTime: new Date(2024, 8, 1, 12, 30, 0),
    },
    {
      id: 2,
      version: 0,
      message: "N'oublie pas ton repas, maman :)",
      dateTime: new Date(),
    },
    {
      id: 3,
      version: 0,
      message: "N'oublie pas ton repas, maman :)",
      dateTime: new Date(),
    },
    {
      id: 4,
      version: 0,
      message: "N'oublie pas ton repas, maman :)",
      dateTime: new Date(),
    },
    {
      id: 5,
      version: 0,
      message: "N'oublie pas ton repas, maman :)",
      dateTime: new Date(),
    },
    {
      id: 6,
      version: 0,
      message: "N'oublie pas ton repas, maman :)",
      dateTime: new Date(),
    },
    {
      id: 7,
      version: 0,
      message: "N'oublie pas ton repas, maman :)",
      dateTime: new Date(),
    },
    {
      id: 8,
      version: 0,
      message: "N'oublie pas ton repas, maman :)",
      dateTime: new Date(),
    },
    {
      id: 9,
      version: 0,
      message: "N'oublie pas ton repas, maman :)",
      dateTime: new Date(),
    },
    {
      id: 10,
      version: 0,
      message: "Bonjour tout le monde ! Alors là, je suis en train de vivre une expérience totalement surréaliste. Imaginez un peu : je suis assis dans ma cuisine, en train de déguster un café décaféiné, parce que, vous savez, j'ai besoin de toute cette énergie en moins pour affronter ma journée de procrastination. Et devinez quoi ? Je réalise que je suis en train de grignoter des biscuits sans gluten, mais je n'ai même pas d'intolérance au gluten. Juste pour être tendance, vous comprenez. Ah, la vie est pleine de paradoxes délicieux ! En tout cas, je suis là, à jongler entre le chaos de mes choix alimentaires et l'absurdité de mon existence. Bonne journée à vous tous, que vos aventures soient aussi étranges et palpitantes que les miennes !",
      dateTime: new Date(),
    }
  ];

  constructor(private toast: HotToastService) {}

  findAll(): Schedule[] {
    return this.schedules;
  }

  findById(id: number): Schedule | undefined {
    return this.schedules.filter((schedule) => schedule.id === id)[0];
  }

  save(schedule: Schedule): Schedule {
    return schedule;
  }

  update(schedule: Schedule): Schedule {
    return schedule;
  }

  delete(id: number | undefined): boolean {
    if (!id) return false
    let elementToRemove = this.findById(id);
    if (!elementToRemove) return false;
    let indexElement = this.schedules.indexOf(elementToRemove);
    if (indexElement === -1) return false;
    this.schedules.splice(indexElement, 1);
    return true;
  }
}
