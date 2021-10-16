import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateUserComponent} from './create-user.component';
import {UserListComponent} from '../user-list/user-list.component';
import {UserService} from '../user.service';
import * as Rx from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;

  class MockUserService {
    public getUsersList(): Rx.Observable<any> {
      return Rx.of([])
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateUserComponent],
      imports: [RouterTestingModule],
      providers: [
        CreateUserComponent,
        {provide: UserService, useClass: MockUserService}
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
