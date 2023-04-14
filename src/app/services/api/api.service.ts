import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private users: Observable<User[]> = of([]);
  private products: Observable<Product[]> = of([]);
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    this.users = this.http
      .get<User[]>(`https://jsonplaceholder.typicode.com/user`)
    return this.users;
  }

  getProducts(): Observable<Product[]> {
    this.products = this.http
      .get<Product[]>(`https://dummyjson.com/products`)
    return this.products;
  }
}
