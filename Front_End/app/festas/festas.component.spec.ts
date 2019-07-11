import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FestasComponent } from './festas.component';

describe('FestasComponent', () => {
  let component: FestasComponent;
  let fixture: ComponentFixture<FestasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FestasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
