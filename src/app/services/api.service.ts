import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public users: Observable<User[]> = of([]);
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    this.users = this.http
      .get<User[]>(`https://jsonplaceholder.typicode.com/users`)
    return this.users;
  }
}
