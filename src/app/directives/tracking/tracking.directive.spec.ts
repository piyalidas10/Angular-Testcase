import { HttpClientModule } from '@angular/common/http';
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

class MockTrackingService {
  public trackEvent: TrackEvent = mockTrackEvent;

  public track(actionName: string, trackingId: string) {
    this.trackEvent.key = `Angular-Tracking -> home -> ${actionName} -> ${actionName}-success`;
    this.trackEvent.url = location.pathname;
    this.trackEvent.created = 0;
  }
}

let mockService = new MockTrackingService();

describe('TrackingDirective: click', () => {
  let component: TestClickComponent;
  let fixture: ComponentFixture<TestClickComponent>;
  let inputEl: DebugElement;
  let inputElNativeElem: HTMLElement;
  let directive: TrackingDirective;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TrackingDirective, TestClickComponent],
      providers: [TrackingService, {useValue: mockService}],
      imports: [HttpClientModule],
      schemas:  [ CUSTOM_ELEMENTS_SCHEMA ]
    }).createComponent(TestClickComponent);

    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('button'));
    inputElNativeElem = inputEl.nativeElement;
    directive = fixture.debugElement.query(By.directive(TrackingDirective)).injector.get(TrackingDirective) as TrackingDirective;
  });

  it('should create button with trackingId', () => {
    inputEl.triggerEventHandler('click', null);
    expect(mockService.trackEvent).toEqual(mockTrackEvent);
    fixture.detectChanges();
  });
});