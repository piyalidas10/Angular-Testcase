import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  Inject,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appTableStickyHeader]',
})
export class TableStickyHeaderDirective implements AfterViewInit, OnDestroy {
  private _counter = 1;
  private _tableChanges$: MutationObserver;
  private _destroySubject$ = new Subject<void>();

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    @Inject(DOCUMENT) public document: Document
  ) {}

  ngAfterViewInit(): void {
    this.createStickyHeader();
    this.detectTableChanges();
    this.tableResize();
    this.updateColumnsWidth();
  }

  createStickyHeader(): void {
    const thead = this.el.nativeElement.querySelector('thead');
    const tbody = this.el.nativeElement.querySelector('tbody');
    if (thead) {
      thead.style.display = 'table';
      thead.style.position = 'sticky';
      thead.style.width = '100%';
      thead.style.top = '0';
      thead.style.zIndex = '1';
    }
    if (tbody) {
      tbody.style.display = 'table';
      tbody.style.width = '100%';
    }
  }

  detectTableChanges(): void {
    this._tableChanges$ = new MutationObserver((mutations) => {
      console.log('mutations => ', mutations);
      // have used for loop because There is no way to stop or break a forEach() loop
      for (const mutation of mutations) {
        if (
          mutation.target.nodeName === 'TBODY' ||
          mutation.target.nodeName === 'THEAD' ||
          mutation.target.nodeName === 'TABLE'
        ) {
          this.updateColumnsWidth();
          break;
        }
      }
    });

    this._tableChanges$.observe(this.el.nativeElement, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true
    });
  }

  tableResize(): void {
    if (this.document.defaultView) {
      console.log(this.document.defaultView);
      fromEvent(this.document.defaultView, 'resize')
        .pipe(debounceTime(1000), takeUntil(this._destroySubject$))
        .subscribe(() => {
          if (this.el && this.el.nativeElement) {
            this.updateColumnsWidth();
          }
        });
    }
  }

  ngOnDestroy(): void {
    this._tableChanges$.disconnect();
    this._destroySubject$.next();
    this._destroySubject$.complete();
  }

  updateColumnsWidth(): void {
    this.clearAllNodesStickyHeaders();
    const ths = this.el.nativeElement.querySelectorAll('thead > tr > th');
    const firstRow = this.el.nativeElement.querySelector('tbody > tr');
    if (ths && firstRow) {
      const tds = firstRow.querySelectorAll('td');
      tds.forEach((el, i) => {
        const header = ths[i] && window.getComputedStyle(ths[i]);
        if (header) {
          el.style.maxWidth = el.style.width = header.width;
        }
      });
      this.renderer.setAttribute(firstRow, 'sticky-header', this._counter++ + '');
    }
  }

  private clearAllNodesStickyHeaders(): void {
    const allStickyHeaderNodes: NodeListOf<HTMLElement> = this.getAllNodesStickyHeaders();
    allStickyHeaderNodes.forEach((stickyHeaderNode) => {
      const tds: NodeListOf<HTMLElement> = stickyHeaderNode.querySelectorAll('td');
      tds.forEach((td) => {
        td.style.maxWidth = td.style.width = 'auto';
      });
      this.renderer.removeAttribute(stickyHeaderNode, 'sticky-header');
    });
  }

  private getAllNodesStickyHeaders(): any {
    return this.el.nativeElement.querySelectorAll('[sticky-header]') || [];
  }
}
