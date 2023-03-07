import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioPreciosComponent } from './cambio-precios.component';

describe('CambioPreciosComponent', () => {
  let component: CambioPreciosComponent;
  let fixture: ComponentFixture<CambioPreciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CambioPreciosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CambioPreciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
