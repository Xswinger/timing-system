import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSampleComponent } from './main-sample.component';

describe('MainSampleComponent', () => {
  let component: MainSampleComponent;
  let fixture: ComponentFixture<MainSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainSampleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
