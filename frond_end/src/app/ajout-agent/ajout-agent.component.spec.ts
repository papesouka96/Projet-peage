import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutAgentComponent } from './ajout-agent.component';

describe('AjoutAgentComponent', () => {
  let component: AjoutAgentComponent;
  let fixture: ComponentFixture<AjoutAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutAgentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
