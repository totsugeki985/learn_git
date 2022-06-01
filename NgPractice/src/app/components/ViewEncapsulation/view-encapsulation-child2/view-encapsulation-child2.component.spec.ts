import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEncapsulationChild2Component } from './view-encapsulation-child2.component';

describe('ViewEncapsulationChild2Component', () => {
  let component: ViewEncapsulationChild2Component;
  let fixture: ComponentFixture<ViewEncapsulationChild2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEncapsulationChild2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEncapsulationChild2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
