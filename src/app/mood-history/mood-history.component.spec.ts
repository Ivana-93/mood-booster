import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodHistoryComponent } from './mood-history.component';

describe('MoodHistoryComponent', () => {
  let component: MoodHistoryComponent;
  let fixture: ComponentFixture<MoodHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoodHistoryComponent]
    });
    fixture = TestBed.createComponent(MoodHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
