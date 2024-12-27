import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheaderComponent } from './theader.component';

describe('TheaderComponent', () => {
  let component: TheaderComponent;
  let fixture: ComponentFixture<TheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
