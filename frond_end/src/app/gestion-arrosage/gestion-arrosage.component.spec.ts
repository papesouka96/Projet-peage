import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionArrosageComponent } from './gestion-arrosage.component';

describe('GestionArrosageComponent', () => {
  let component: GestionArrosageComponent;
  let fixture: ComponentFixture<GestionArrosageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionArrosageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionArrosageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
