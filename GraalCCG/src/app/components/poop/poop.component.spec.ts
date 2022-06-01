import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoopComponent } from './poop.component';

describe('PoopComponent', () => {
  let component: PoopComponent;
  let fixture: ComponentFixture<PoopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
