import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiTestbedService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    // original url : https://jsonplaceholder.typicode.com/users
    return this.http.get<any>('https://jsonplaceholder.typicode.com/users').pipe(
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
