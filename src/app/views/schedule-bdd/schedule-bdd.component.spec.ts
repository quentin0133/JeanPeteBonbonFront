import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleBDDComponent } from './schedule-bdd.component';

describe('ScheduleBDDComponent', () => {
  let component: ScheduleBDDComponent;
  let fixture: ComponentFixture<ScheduleBDDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleBDDComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleBDDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
