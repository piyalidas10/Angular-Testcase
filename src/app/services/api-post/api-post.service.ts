import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiPostService {

  constructor(private http: HttpClient) { }

  createAirline(): Observable<any> {
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
    return this.http.post<any>('https://api.instantwebtools.net/v1/airlines', req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return of(undefined);
        } else {
          return throwError(error.error);
        }
      })
    );
  }
}
