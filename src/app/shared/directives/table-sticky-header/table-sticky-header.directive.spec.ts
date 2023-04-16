import { Component, DebugElement } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TableStickyHeaderDirective } from './table-sticky-header.directive';
import { mocktabledata, mocktableheader } from 'src/app/mockdata/mocktabledata';

@Component({
  template: `
    <table appTableStickyHeader>
      <thead>
        <tr>
          <th *ngFor="let header of headers">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr sticky-header="2">
          <td>Default</td>
          <td>Defaultson</td>
          <td>def@somemail.com</td>
        </tr>
        <tr>
          <td>Success</td>
          <td>Doe</td>
          <td>john@example.com</td>
        </tr>
      </tbody>
    </table>

    <table appTableStickyHeader>
      <thead>
        <tr>
          <th *ngFor="let header of headers">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let row of data">
          <td>
            {{ row.Firstname }}
          </td>
          <td>
            {{ row.Lastname }}
          </td>
          <td>
            {{ row.Email }}
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styles: ['* { box-sizing: border-box; }'],
})
class TestComponent {
  headers: string[] = mocktableheader;
  data;

  constructor() {
    this.data = mocktabledata;
  }
}

describe('TableStickyHeaderDirective', () => {
  let component: TestComponent;
  let doc: Document;
  let fixture: ComponentFixture<TestComponent>;
  let directiveElm: DebugElement;
  let directive: TableStickyHeaderDirective;
  let table: HTMLElement;
  let thead: HTMLElement;
  let tbody: HTMLElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TestComponent, TableStickyHeaderDirective],
    }).createComponent(TestComponent);
    component = fixture.componentInstance;
    directiveElm = fixture.debugElement;
    directive = directiveElm.query(By.directive(TableStickyHeaderDirective)).componentInstance;
    thead = directiveElm.nativeElement.querySelector('thead');
    tbody = directiveElm.nativeElement.querySelector('tbody');
    table = directiveElm.nativeElement.querySelector('table');
    doc = TestBed.inject(DOCUMENT);
    fixture.detectChanges();
  });

  it('should set sticky headers with thead', () => {
    expect(thead.style.display).toBe('table');
    expect(thead.style.position).toBe('sticky');
    expect(thead.style.width).toBe('100%');
    expect(thead.style.top).toBe('0px');
    expect(thead.style.zIndex).toBe('1');
  });

  it('should set sticky headers with to tbody', () => {
    expect(tbody.style.display).toBe('table');
    expect(tbody.style.width).toBe('100%');
  });

  it('should set sticky headers with to tbody', fakeAsync(() => {
    fixture.detectChanges(); // render
    table.dispatchEvent(new Event("resize"));
    tick(1000);
  }));
});
