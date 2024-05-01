import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrollMessageBDDComponent } from './troll-message-bdd.component';

describe('TrollMessageBDDComponent', () => {
  let component: TrollMessageBDDComponent;
  let fixture: ComponentFixture<TrollMessageBDDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrollMessageBDDComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrollMessageBDDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
