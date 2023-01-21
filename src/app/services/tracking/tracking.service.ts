import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { timeout, catchError, tap } from 'rxjs/operators';
import { AppInfo } from 'src/app/config/appinfo';
import { Endpoint } from 'src/app/config/endpoint';
import { TrackEventValue } from 'src/app/models/track-event-value';
import { TrackEvent } from '../../models/track-event';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {
  public initialized = false;
  private trackingUrl = '';
  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.initialize();
  }

  private initialize() {
    this.trackingUrl = `${Endpoint.originApi}${Endpoint.trackingUrl}`;
    this.initialized = true;
  }

  public track(actionName: string, trackingId: string, customValue?: string) {
    const event = this.buildEventRequest(actionName, trackingId, customValue ? customValue : '');
    this.callToTrackAPI(event)?.pipe(
      timeout(300),
      catchError((error) => of({ error }))
    ).subscribe();
  }

  private callToTrackAPI(event: TrackEvent) {
    if (!this.initialize || (this.trackingUrl.indexOf('undefined') >= 0) || this.trackingUrl === Endpoint.originApi) {
      return of({});
    }
    // Call API to save tracking data in database
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post(this.trackingUrl, event, { headers });
  }

  private buildEventRequest(
    actionName: string,
    trackingId: string,
    customValue: string
  ) {
    const page = this.pageBuilder(location.pathname);
    if (trackingId.trim() === '') {
      trackingId = 'component-undefined';
    }
    const key = this.keyBuilder(
      AppInfo.appName,
      actionName,
      trackingId,
      page
    );
    return this.createTrackEvent(
      key,
      actionName,
      trackingId,
      page,
      customValue
    );
  }

  private createTrackEvent(
    key: string,
    actionName: string,
    trackingId: string,
    page: string | null,
    customValue?: string
  ): TrackEvent {
    const result: TrackEvent = new TrackEvent();
    result.key = key;
    result.url = location.pathname;
    result.created = this.sharedService.getCurrentTime();
    result.customValue = customValue ? customValue : '';
    result.value = this.createTrackEventValue(actionName, trackingId, page);
    return result;
  }

  createTrackEventValue(
    actionName: string,
    trackingId: string,
    page: string | null
  ): TrackEventValue {
    const trackEventValue = new TrackEventValue();
    trackEventValue.action = actionName;
    trackEventValue.component = trackingId;
    trackEventValue.page = page;
    trackEventValue.app = AppInfo.appName;
    trackEventValue.appVersion = AppInfo.appVersion;
    return trackEventValue;
  }

  private keyBuilder(
    appName: string,
    actionName: string,
    trackingId: string,
    page: string | null
  ): string {
    return `${appName} -> ${page} -> ${actionName} -> ${trackingId}`;
  }

  pageBuilder(pageName: string) {
    const regex = /\/([a-zA-Z]+).*/;
    if (pageName === '/') {
      return 'home';
    } else {
      const pageNameBuilt = regex.exec(pageName);
      return pageNameBuilt ? pageNameBuilt[1] : null;
    }
  }
}
