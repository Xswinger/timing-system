import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatControlComponent } from './heat-control.component';

describe('HeatControlComponent', () => {
  let component: HeatControlComponent;
  let fixture: ComponentFixture<HeatControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeatControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeatControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
