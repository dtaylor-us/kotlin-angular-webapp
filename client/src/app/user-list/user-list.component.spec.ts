import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserListComponent} from './user-list.component';
import {UserService} from '../user.service';
import * as Rx from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  class MockUserService {
    public getUsersList(): Rx.Observable<any> {
      return Rx.of([])
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      imports: [RouterTestingModule],
      providers: [
        UserListComponent,
        {provide: UserService, useClass: MockUserService}
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call ngOnInit', () => {
    const fixture = TestBed.createComponent(UserListComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(UserService);

    const mockData = [{
      _id: "01",
      firstName: "test",
      lastName: "user",
      emailId: "test@email.com",
      active: true,
    }];

    let spy_getPostDetails = spyOn(service, "getUsersList").and.callFake(() => {
      return Rx.of(mockData);
    });
    component.ngOnInit();
    console.log(component.users);
    expect(component.users).toEqual(mockData);
  })
});
