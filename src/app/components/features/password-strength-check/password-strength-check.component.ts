import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange } from '@angular/core';
import { PasswordStrength, PasswordStrengthColors, PasswordStrengthVal } from 'src/app/models/password-strength';

@Component({
  selector: 'app-password-strength-check',
  templateUrl: './password-strength-check.component.html',
  styleUrls: ['./password-strength-check.component.css']
})
export class PasswordStrengthCheckComponent implements OnInit, OnChanges {
  bar0: string;
  bar1: string;
  bar2: string;
  @Input() public passwordToCheck: string;
  @Output() passwordStrength = new EventEmitter<boolean>();
  message: string;
  messageColor: string;
  private passwordStrengthColorsMap = new Map<number, any>();
  
  constructor() { }

  ngOnInit(): void {
  }

  checkStrength(password: string) {
    // 1
    let force = 0;

    // 2
    const regex = /[$-/:-?{-~!"^_@`\[\]]/g;
    const lowerLetters = /[a-z]+/.test(password);
    const upperLetters = /[A-Z]+/.test(password);
    const numbers = /[0-9]+/.test(password);
    const symbols = regex.test(password);

    // 3
    const flags = [lowerLetters, upperLetters, numbers, symbols];

    // 4
    let passedMatches = 0;
    for (const flag of flags) {
      passedMatches += flag === true ? 1 : 0;
    }

    // 5
    force += 2 * password.length + (password.length >= 10 ? 1 : 0);
    force += passedMatches * 10;

    // 6
    force = password.length <= 6 ? Math.min(force, 10) : force;

    // 7
    force = passedMatches === 1 ? Math.min(force, 10) : force;
    force = passedMatches === 2 ? Math.min(force, 20) : force;
    force = passedMatches === 3 ? Math.min(force, 30) : force;

    return force;
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    const password = changes.passwordToCheck.currentValue;

    this.setBarColors(3, PasswordStrengthColors[0]);

    if (password) {
      const pwdStrength = this.checkStrength(password);
      pwdStrength === PasswordStrength.GOOD ? this.passwordStrength.emit(true) : this.passwordStrength.emit(false);

      const color = this.getColor(pwdStrength);
      this.setBarColors(color.index, color.color);

      switch (pwdStrength) {
        case PasswordStrength.POOR:
          this.message = PasswordStrengthVal[PasswordStrength.POOR];
          break;
        case PasswordStrength.AVERAGE:
          this.message = PasswordStrengthVal[PasswordStrength.AVERAGE];
          break;
        case PasswordStrength.GOOD:
          this.message = PasswordStrengthVal[PasswordStrength.GOOD];
          break;
      }
    } else {
      this.message = '';
    }
  }

  private getColor(strength: number) {
    let index = 0;
    this.messageColor = PasswordStrengthColors[strength];

    return {
      index: index + 1,
      color: PasswordStrengthColors[index+1],
    };
  }

  private setBarColors(count: number, color: string) {
    for (let n = 0; n < count; n++) {
      (this as any)['bar' + n] = color;
    }
  }
}
