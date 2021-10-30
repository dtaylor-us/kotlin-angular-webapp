import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserListComponent} from './user-list.component';
import {UserService} from '../user.service';
import * as Rx from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import {routes} from '../app-routing.module'
import {Location} from "@angular/common";

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let location: Location;
  let service: UserService;
  const TEST_USER_ID = "1";

  class MockUserService {
    public getUsersList(): Rx.Observable<any> {
      return Rx.of([])
    }
  }

  const mockUserListData = [{
    _id: "01",
    firstName: "test",
    lastName: "user",
    emailId: "test@email.com",
    active: true,
  }];

  let router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      imports: [RouterTestingModule.withRoutes(routes)],
      providers: [
        UserListComponent,
        {provide: UserService, useClass: MockUserService},
        {provide: Router, useValue: router}
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture.detectChanges();
    service = fixture.debugElement.injector.get(UserService);
  });

  it('should load user data when ngOnInit is called', () => {
    let spy_getPostDetails = spyOn(service, "getUsersList").and.callFake(() => {
      return Rx.of(mockUserListData);
    });
    component.ngOnInit();
    expect(component.users).toEqual(mockUserListData);
  });

  it('should reload data should populate user list', () => {
    let spy_getPostDetails = spyOn(service, "getUsersList").and.callFake(() => {
      return Rx.of(mockUserListData);
    });
    component.reloadData();
    expect(component.users).toEqual(mockUserListData);
  });

  it('should navigate to update/{id} when updateUser is called', () => {
    component.updateUser(TEST_USER_ID);
    expect(router.navigate).toHaveBeenCalledWith(['update', TEST_USER_ID]);
  });

  it('should navigate to details/{id} when userDetails is called', () => {
    component.userDetails(TEST_USER_ID);
    expect(router.navigate).toHaveBeenCalledWith(['details', TEST_USER_ID]);
  });
});


