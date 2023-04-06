import { Component, DebugElement } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TableStickyHeaderDirective } from './table-sticky-header.directive';
import { fromEvent, of } from 'rxjs';

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
        <tr *ngFor="let row of data">
          <td *ngFor="let cell of row">
            {{ cell }}
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styles: ['* { box-sizing: border-box; }'],
})
class TestComponent {
  headers: string[] = ['Col 1', 'Col 2', 'Col 3', 'Col 4'];
  data: string[][] = [];

  constructor() {
    for (let i = 0; i <= 1; i++) {
      this.data[i] = [];
      for (let j = 0; j < 5; j++) {
        this.data[i][j] = `row ${i}-${j}`;
      }
    }
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

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
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

  it('should trigger tableResize method when window is resized', () => {
    directive.ngAfterViewInit();
    const resize$ = fromEvent(doc.defaultView as Window, 'resize');
    resize$.subscribe(() => {
      spyOn(directive, 'updateColumnsWidth');
    });
  });

});
