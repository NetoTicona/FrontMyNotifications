import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegresiveCounterPage } from './regresive-counter.page';

describe('RegresiveCounterPage', () => {
  let component: RegresiveCounterPage;
  let fixture: ComponentFixture<RegresiveCounterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegresiveCounterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
