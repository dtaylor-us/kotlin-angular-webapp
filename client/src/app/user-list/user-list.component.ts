import {Observable} from "rxjs";
import {UserService} from "../user.service";
import {User} from "../user";
import {Component, OnInit} from "@angular/core";
import {Router} from '@angular/router';

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"]
})
export class UserListComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService,
              private router: Router) {
    this.users = [];
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.userService.getUsersList().subscribe(
      data => {
        this.users = data
        console.log(data)
      },
      error => {
        console.log(error)
      }
    )
  }

  deleteUser(_id: string) {

    this.userService.deleteUser(_id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  updateUser(id: string) {
    this.router.navigate(['update', id]);
  }

  userDetails(_id: string) {
    this.router.navigate(['details', _id]);
  }
}
