import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatResultComponent } from './heat-result.component';

describe('HeatResultComponent', () => {
  let component: HeatResultComponent;
  let fixture: ComponentFixture<HeatResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeatResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeatResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
