import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  lists: any[] = []
  username: string = ''
  constructor(private service: UserService, private router: Router) { }

  ngOnInit() {
    this.getLists()
  }

  getLists(){
    this.service.getUserById(localStorage.getItem('userId'))
      .subscribe(user => {
        this.username = user.username
      })
    this.service.getUsers(localStorage.getItem('userId'))
      .subscribe(users => {
        this.lists = users
      })
  }

  edit(id: string) {
    this.router.navigate(['/edit'],
      {
        queryParams: {
          id: id
        }
      })
  }

  remove(id: string) {
    this.service.delete(id).subscribe(res => {
        this.getLists()
    })
  }

  logOut() {
    localStorage.clear()
    this.router.navigate(['/login'])
  }

  addNewUser() {
    this.router.navigate(['/add-user'])
  }
}
