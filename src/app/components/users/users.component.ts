import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api/api.service';
import { ErrorShowService } from 'src/app/services/error-show/error-show.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { TrackingService } from 'src/app/services/tracking/tracking.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  data: User[];
  customValue = {
    statusText: '',
    message: '',
  };
  isLoading$ = new Observable<boolean>();
  errorMsg$ = new Observable<string>();
  constructor(
    private apiService: ApiService,
    private loaderService: LoaderService,
    private errorShowService: ErrorShowService,
    private trackingService: TrackingService
  ) {
    this.callUsers();
  }

  ngOnInit(): void {
    this.isLoading$ = this.loaderService.isLoading$;
    this.errorMsg$ = this.errorShowService.errorMsg$;
  }

  callUsers() {
    this.apiService
      .getUsers()
      // .pipe(
      //   catchError((error) => {
      //     this.customValue = {
      //       statusText: error.statusText,
      //       message: error.message,
      //     };
      //     this.trackingService.track(
      //       'user-API',
      //       `user-API-error-${error.status}`,
      //       JSON.stringify(this.customValue)
      //     );
      //     return throwError(() => error);
      //   })
      // )
      .subscribe({
        next: (data) => {
          console.log('API Response => ', data);
          if (data?.length > 0) {
            console.log('API Response => ', data);
            this.customValue = {
              statusText: '200',
              message: 'Data found',
            };
            this.trackingService.track(
              'user-API',
              'user-API-success',
              JSON.stringify(this.customValue)
            );
            this.data = data;
          } else {
            this.customValue = {
              statusText: '200',
              message: 'Data not found',
            };
            this.trackingService.track(
              'user-API',
              `user-API-repone-blank`,
              JSON.stringify(this.customValue)
            );
            console.log('Blank reponse');
          }
        },
      });
}

}
