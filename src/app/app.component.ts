import { Component } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FakeUser } from './models/fakeuser';
import { User } from './models/user';
import { ApiPostService } from './services/api-post/api-post.service';
import { ApiTestbedService } from './services/api-testbed/api-testbed.service';
import { ErrorShowService } from './services/error-show/error-show.service';
import { FakeusersApiService } from './services/fakeusers/fakeusers-api.service';
import { LoaderService } from './services/loader/loader.service';
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
    private fakeusersApiService: FakeusersApiService,
    private apiPostService: ApiPostService,

  ) {
    this.callFakeUsers();
  }

  ngOnInit() {    
  }

  callFakeUsers() {
    this.fakeusersApiService
      .getFakeUsers()
      .pipe(
        // catchError((error) => {
        //   this.customValue = {
        //     statusText: error.statusText,
        //     message: error.message,
        //   };
        //   this.trackingService.track(
        //     'fakeuser-API',
        //     `fakeuser-API-error-${error.status}`,
        //     JSON.stringify(this.customValue)
        //   );
        //   return throwError(() => error);
        // })
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


  createAirline() {
    const req = {
      "id": 12,
      "name": "Sri Lankan Airways",
      "country": "Sri Lanka",
      "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Qatar_Airways_Logo.svg/sri_lanka.png",
      "slogan": "From Sri Lanka",
      "head_quaters": "Katunayake, Sri Lanka",
      "website": "www.srilankaairways.com",
      "established": "1990"
  };
    this.apiPostService
      .createAirline(req)
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      )
      .subscribe({
        next: (res) => {
          console.log('createAirline res => ', res);
        }
      })
  }
    
}
