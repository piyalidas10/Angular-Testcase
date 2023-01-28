import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FakeUser } from 'src/app/models/fakeuser';

@Injectable({
  providedIn: 'root'
})
export class FakeusersApiService {

  public fakeusers: Observable<FakeUser[]> = of([]);
  constructor(private http: HttpClient) { }

  getFakeUsers(): Observable<FakeUser[]> {
    this.fakeusers = this.http
      .get<FakeUser[]>(`https://raw.githubusercontent.com/piyalidas10/dummy-json/main/fakeuser.json`)
    return this.fakeusers;
  }
}
