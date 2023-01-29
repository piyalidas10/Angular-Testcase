import { Component } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FakeUser } from './models/fakeuser';
import { User } from './models/user';
import { ApiTestbedService } from './services/api-testbed.service';
import { FakeusersApiService } from './services/fakeusers/fakeusers-api.service';
import { TrackingService } from './services/tracking/tracking.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data: User[];
  customValue = {
    statusText: '',
    message: '',
  };
  fakeUsers: FakeUser[];

  constructor(
    private apiService: ApiTestbedService,
    private trackingService: TrackingService,
    private fakeusersApiService: FakeusersApiService
  ) {
    this.callUsers();
    this.callFakeUsers();
  }

  callUsers() {
      this.apiService
        .getUsers()
        .pipe(
          catchError((error) => {
            this.customValue = {
              statusText: error.statusText,
              message: error.message,
            };
            this.trackingService.track(
              'user-API',
              `user-API-error-${error.status}`,
              JSON.stringify(this.customValue)
            );
            return throwError(() => error);
          })
        )
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

  callFakeUsers() {
    this.fakeusersApiService
      .getFakeUsers()
      .pipe(
        catchError((error) => {
          this.customValue = {
            statusText: error.statusText,
            message: error.message,
          };
          this.trackingService.track(
            'fakeuser-API',
            `fakeuser-API-error-${error.status}`,
            JSON.stringify(this.customValue)
          );
          return throwError(() => error);
        })
      )
      .subscribe({
        next: (data) => {
          if (data?.length > 0) {
            console.log('fakeuser Response => ', data);
            this.customValue = {
              statusText: '200',
              message: 'Data found',
            };
            this.trackingService.track(
              'fakeuser-API',
              'fakeuser-API-success',
              JSON.stringify(this.customValue)
            );
            this.fakeUsers = data;
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
