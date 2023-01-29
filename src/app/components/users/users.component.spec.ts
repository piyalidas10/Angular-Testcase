import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { mockUsers } from 'src/app/mockdata/users';
import { ApiService } from 'src/app/services/api/api.service';

import { UsersComponent } from './users.component';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let service: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ UsersComponent ],
      providers: [ApiService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    component.isLoading = false;
    service = fixture.debugElement.injector.get(ApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get users from showUsers if getUsers is successfull', () => {
    component.isLoading = true;
    spyOn(component, 'showMsg').and.stub();
    spyOn(service, 'getUsers').and.returnValue(of(mockUsers));
    component.isLoading = false;
    component.showUsers();
    expect(component.users).toEqual(mockUsers);
  });

  it('should get users from showUsers if getUsers is not successfull', () => {
    component.isLoading = true;
    spyOn(component, 'showMsg').and.stub();
    spyOn(service, 'getUsers').and.returnValue(throwError({status: 404}));
    component.isLoading = false;
    component.showUsers();
    expect(component.users).toEqual([]);
  });
});
