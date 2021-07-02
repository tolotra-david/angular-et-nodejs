import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  total: number = 0
  isLogin: string = 'login'

  constructor(private service: UserService) {
  }

  ngOnInit() {
    localStorage.clear()
    this.service.getCount().subscribe(res => {
      this.total = res.total > 0 ? res.total : '0'
    })
  }

}
