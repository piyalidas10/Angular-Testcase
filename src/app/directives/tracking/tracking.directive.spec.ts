import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TrackingService } from '../../services/tracking/tracking.service';
import { TrackingDirective } from './tracking.directive';
import { TrackEvent } from '../../models/track-event';
import { mockTrackEvent } from '../../mockdata/trackEvent';

@Component({
  template: `<button appTracking [trackingId]="'clickbutton'">CLick</button>`
})
class TestClickComponent {
}

describe('TrackingDirective: click', () => {
  let component: TestClickComponent;
  let fixture: ComponentFixture<TestClickComponent>;
  let inputEl: DebugElement;
  let inputElNativeElem: HTMLElement;
  let directive: TrackingDirective;
  let service: TrackingService;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TrackingDirective, TestClickComponent],
      providers: [TrackingService],
      imports: [HttpClientModule],
      schemas:  [ CUSTOM_ELEMENTS_SCHEMA ]
    }).createComponent(TestClickComponent);

    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('button'));
    inputElNativeElem = inputEl.nativeElement;
    service = TestBed.inject(TrackingService);
    directive = fixture.debugElement.query(By.directive(TrackingDirective)).injector.get(TrackingDirective) as TrackingDirective;
  });

  it('should create button with trackingId', () => {
    directive.trackingId = 'user-API-success';
    inputEl.triggerEventHandler('click', null);
    service.track('api-call', directive.trackingId);
    fixture.detectChanges();
  });
});