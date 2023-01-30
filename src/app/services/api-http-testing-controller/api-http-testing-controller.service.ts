import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiHttpTestingControllerService {
  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    // original url : https://jsonplaceholder.typicode.com/users
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users').pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return of(undefined);
        } else {
          return throwError(`Failed to fetch users`);
        }
      })
    );
  }
}
