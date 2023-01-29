import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  msg: string  = '';
  isLoading: boolean = false;
  constructor(private apiService: ApiService) {
    this.showUsers();
  }

  ngOnInit(): void {
  }

  showUsers(): void {
    this.isLoading = true;
    this.showMsg();
    this.apiService.getUsers().subscribe(data => {
      this.users = data;
      this.isLoading = false;
      console.log('users => ', this.users);
    }, error => {
      console.log(error);
      this.isLoading = false;
    });
  }

  showMsg(): void {
    this.msg = 'User lists';
  }

}
