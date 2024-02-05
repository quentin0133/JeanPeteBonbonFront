import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementBDDComponent } from './element-bdd.component';

describe('ElementBDDComponent', () => {
  let component: ElementBDDComponent;
  let fixture: ComponentFixture<ElementBDDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementBDDComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementBDDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
