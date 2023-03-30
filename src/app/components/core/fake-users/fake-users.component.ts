import { Component, OnInit } from '@angular/core';
import { FakeUser } from 'src/app/models/fakeuser';
import { FakeusersApiService } from 'src/app/services/fakeusers/fakeusers-api.service';
import { TrackingService } from 'src/app/services/tracking/tracking.service';

@Component({
  selector: 'app-fake-users',
  templateUrl: './fake-users.component.html',
  styleUrls: ['./fake-users.component.css']
})
export class FakeUsersComponent implements OnInit {
  fakeUsers: FakeUser[];
  customValue = {
    statusText: '',
    message: '',
  };
  constructor(private fakeusersApiService: FakeusersApiService, private trackingService: TrackingService,) {
    this.callFakeUsers();
  }

  ngOnInit(): void {
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
        next: (data: any) => {
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
