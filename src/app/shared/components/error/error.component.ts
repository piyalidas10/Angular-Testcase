import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { GlobalErrorType } from 'src/app/models/global-error';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  public compDestroy$: Subject<boolean> = new Subject();
  errorData: GlobalErrorType | undefined;

  constructor(private route: ActivatedRoute) {
    this.route.queryParamMap
      //.pipe(takeUntil(this.compDestroy$))
      .subscribe((params: any) => {
        console.log('params => ', params);
        this.errorData = JSON.parse(params.errorDataVal);
      });
  }

  ngOnInit(): void {}

  ngDestroy() {
    this.compDestroy$.next(true);
    this.compDestroy$.complete();
  }
}
