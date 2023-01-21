import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  getCurrentTime(): number {
    return Math.round(new Date().getSeconds() / 1000);
  }
}
