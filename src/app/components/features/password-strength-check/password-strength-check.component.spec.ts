import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordStrengthCheckComponent } from './password-strength-check.component';

describe('PasswordStrengthCheckComponent', () => {
  let component: PasswordStrengthCheckComponent;
  let fixture: ComponentFixture<PasswordStrengthCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordStrengthCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordStrengthCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
