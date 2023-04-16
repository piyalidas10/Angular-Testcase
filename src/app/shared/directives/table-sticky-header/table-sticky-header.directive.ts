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
import { WindowRefService } from '../../services/window/window-ref.service';

@Directive({
  selector: '[appTableStickyHeader]',
})
export class TableStickyHeaderDirective implements AfterViewInit, OnDestroy {
  private _counter = 1;
  private _destroySubject$ = new Subject<void>();
  private allStickyHeaderNodes: NodeListOf<HTMLElement> | [] = [];

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer2: Renderer2,
    @Inject(DOCUMENT) public document: Document,
    private windowRef: WindowRefService // javascript window object will not work for Angular Universal (SSR)
  ) {}

  ngAfterViewInit(): void {
    this.createStickyHeader();
    this.tableResize();
    this.modifyColumnsWidth();
  }

  createStickyHeader(): void {
    const thead = this.el.nativeElement.querySelector('thead');
    const tbody = this.el.nativeElement.querySelector('tbody');
    if (thead) {
      this.renderer2.setStyle(thead, 'display', 'table');
      this.renderer2.setStyle(thead, 'position', 'sticky');
      this.renderer2.setStyle(thead, 'width', '100%');
      this.renderer2.setStyle(thead, 'top', '0');
      this.renderer2.setStyle(thead, 'zIndex', '1');
    }
    if (tbody) {
      this.renderer2.setStyle(tbody, 'display', 'table');
      this.renderer2.setStyle(tbody, 'width', '100%');
    }
  }

  tableResize(): void {
    /*
     document.defaultView returns the window object associated with a document, or null if none is available
     var def_view = document.defaultView;
     var width = def_view.innerWidth;
     var height = def_view.innerHeight;
    */ 
    if (this.document.defaultView) {
      fromEvent(this.document.defaultView, 'resize')
        .pipe(debounceTime(1000), takeUntil(this._destroySubject$))
        .subscribe(() => {
          this.modifyColumnsWidth();
        });
    }
  }

  ngOnDestroy(): void {
    this._destroySubject$.next();
    this._destroySubject$.complete();
  }

  modifyColumnsWidth(): void {
    if (this.el && this.el.nativeElement) {
      this.clearAllNodesStickyHeaders();
      const ths = this.el.nativeElement.querySelectorAll('thead > tr > th');
      const row = this.el.nativeElement.querySelector('tbody > tr');
      if (ths && row) {
        const tds = row.querySelectorAll('td');
        tds.forEach((el, i) => {
          const header = ths[i] && this.windowRef.nativeWindow.getComputedStyle(ths[i]);
          if (header) {
            this.renderer2.setStyle(el, 'maxWidth', header.width);
            this.renderer2.setStyle(el, 'width', header.width);
          }
        });
        this.renderer2.setAttribute(row, 'sticky-header', this._counter++ + '');
      }
    }
  }

  private clearAllNodesStickyHeaders(): void {
    this.allStickyHeaderNodes = this.el.nativeElement.querySelectorAll('[sticky-header]') || [];
    if (this.allStickyHeaderNodes && this.allStickyHeaderNodes.length > 0) {
      this.allStickyHeaderNodes.forEach((stickyHeaderNode) => {
        const tds: NodeListOf<HTMLElement> = stickyHeaderNode.querySelectorAll('td');
        tds.forEach((td) => {
          this.renderer2.setStyle(td, 'maxWidth', 'auto');
          this.renderer2.setStyle(td, 'width', 'auto');
        });
        this.renderer2.removeAttribute(stickyHeaderNode, 'sticky-header');
      });
    }
  }
}
