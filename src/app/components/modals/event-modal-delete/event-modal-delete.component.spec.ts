import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventModalDeleteComponent } from './event-modal-delete.component';

describe('EventModalDeleteComponent', () => {
  let component: EventModalDeleteComponent;
  let fixture: ComponentFixture<EventModalDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventModalDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventModalDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
