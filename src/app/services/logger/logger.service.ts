import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  msg: string[] = [];
  constructor() {
    // debugger;
  }

  log(txt: string) {
    // debugger;
    console.log(txt);
    this.msg.push(txt);
  }

  clear() {
    this.msg = [];
  }
}
