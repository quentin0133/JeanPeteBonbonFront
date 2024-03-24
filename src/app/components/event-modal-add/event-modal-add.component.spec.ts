import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventModalAddComponent } from './event-modal-add.component';

describe('EventModalAddComponent', () => {
  let component: EventModalAddComponent;
  let fixture: ComponentFixture<EventModalAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventModalAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventModalAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
