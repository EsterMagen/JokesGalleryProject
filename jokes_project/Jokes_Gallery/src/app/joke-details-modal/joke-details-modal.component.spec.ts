import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeDetailsModalComponent } from './joke-details-modal.component';

describe('JokeDetailsModalComponent', () => {
  let component: JokeDetailsModalComponent;
  let fixture: ComponentFixture<JokeDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JokeDetailsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JokeDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
