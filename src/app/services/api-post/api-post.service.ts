import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiPostService {
  constructor(private http: HttpClient) { }

  createAirline(req: any): Observable<any> {
    
    return this.http.post<any>('https://api.instantwebtools.net/v1/airlines', req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          return of(error.message); // message:"there is an airline registered under same id you've entered"
        } else {
          return of('Please try again later');
        }
      })
    );
  }
}
