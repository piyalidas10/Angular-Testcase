import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get<any>('https://jsonplaceholder.typicode.com/users');
  }
}
