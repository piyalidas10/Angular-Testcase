import { Component } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SafeType } from './models/safe-type';
import { User } from './models/user';
import { ApiPostService } from './services/api-post/api-post.service';
import { MaskDataPipe } from './shared/pipes/mask-data/mask-data.pipe';
import { SanitizePipe } from './shared/pipes/sanitize/sanitize.pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  data: User[];
  customValue = {
    statusText: '',
    message: '',
  };
  accountNo: string;
  sampleTableData: any[] = [];
  htmlSnippet: string = "<script>safeCode()</script>";
  videoURL: string = 'https://www.w3schools.com/html/mov_bbb.mp4';

  constructor(
    private apiPostService: ApiPostService,
    private maskDataPipe: MaskDataPipe,
    private sanitizePipe: SanitizePipe
  ) {
    this.accountNo = this.maskDataPipe.transform('1234567890', '*', 3, 6);
    this.sampleTable();
    console.log('sanitizePipe => ', this.sanitizePipe.transform(`<a href="javascript:alert('hello')">click</a>`, SafeType.HTML));
  }

  ngOnInit() {}

  sampleTable() {
    this.sampleTableData = [
      {
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
      },
      {
        name: 'Ervin Howell',
        username: 'Antonette',
        email: 'Shanna@melissa.tv',
      },
      {
        name: 'Clementine Bauch',
        username: 'Samantha',
        email: 'Nathan@yesenia.net',
      },
    ];
  }

  addTable() {
    this.sampleTableData.push({
      "name": "Patricia Lebsack",
      "username": "Karianne",
      "email": "Julianne.OConner@kory.org",
    });
  }

  createAirline() {
    const req = {
      id: 12,
      name: 'Sri Lankan Airways',
      country: 'Sri Lanka',
      logo:
        'https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Qatar_Airways_Logo.svg/sri_lanka.png',
      slogan: 'From Sri Lanka',
      head_quaters: 'Katunayake, Sri Lanka',
      website: 'www.srilankaairways.com',
      established: '1990',
    };
    this.apiPostService
      .createAirline(req)
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      )
      .subscribe({
        next: (res) => {
          console.log('createAirline res => ', res);
        },
      });
  }
}
