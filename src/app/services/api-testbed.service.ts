import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiTestbedService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    // original url : https://jsonplaceholder.typicode.com/users
    return this.http.get<any>('https://jsonplaceholder.typicode.com/user');
  }
}
