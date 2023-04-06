import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TrackingService } from '../tracking/tracking.service';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  msg: string[] = [];
  constructor(private trackingService: TrackingService) {
    // debugger;
  }

  log(txt: string) {
    // debugger;
    console.log(txt);
    this.msg.push(txt);
  }

  error(actionName: string, trackingId: string, msg: string) {
    if (environment.production) {
      this.trackingService.track(actionName, trackingId, msg);
    }
  }

  clear() {
    this.msg = [];
  }
}
