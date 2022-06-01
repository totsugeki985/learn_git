import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraalianCardComponent } from './graalian-card.component';

describe('GraalianCardComponent', () => {
  let component: GraalianCardComponent;
  let fixture: ComponentFixture<GraalianCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraalianCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraalianCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
