import { Component } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from './models/user';
import { ApiPostService } from './services/api-post/api-post.service';

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
  
  

  constructor(
    private apiPostService: ApiPostService,

  ) {
    
  }

  ngOnInit() {    
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
