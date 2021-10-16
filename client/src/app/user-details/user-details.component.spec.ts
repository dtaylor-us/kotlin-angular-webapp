import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsComponent } from './user-details.component';
import {RouterTestingModule} from '@angular/router/testing';
import {UserListComponent} from '../user-list/user-list.component';
import {UserService} from '../user.service';
import * as Rx from 'rxjs';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  class MockUserService {
    public getUser(): Rx.Observable<any> {
      return Rx.of([])
    }
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDetailsComponent ],
      imports: [RouterTestingModule],
      providers: [
        UserDetailsComponent,
        {provide: UserService, useClass: MockUserService}
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
