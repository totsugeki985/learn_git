import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEncapsulationParentComponent } from './view-encapsulation-parent.component';

describe('ViewEncapsulationParentComponent', () => {
  let component: ViewEncapsulationParentComponent;
  let fixture: ComponentFixture<ViewEncapsulationParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEncapsulationParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEncapsulationParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
