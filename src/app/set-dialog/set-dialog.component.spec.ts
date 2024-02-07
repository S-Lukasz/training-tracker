import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetDialogComponent } from './set-dialog.component';

describe('SetDialogComponent', () => {
  let component: SetDialogComponent;
  let fixture: ComponentFixture<SetDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SetDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
