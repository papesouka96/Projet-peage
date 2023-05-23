import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutAbonneComponent } from './ajout-abonne.component';

describe('AjoutAbonneComponent', () => {
  let component: AjoutAbonneComponent;
  let fixture: ComponentFixture<AjoutAbonneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutAbonneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutAbonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
