import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideosListPage } from './videos-list.page';

describe('VideosListPage', () => {
  let component: VideosListPage;
  let fixture: ComponentFixture<VideosListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
