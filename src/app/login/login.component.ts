import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  username = "";
  password = "";

  clearlogin() {
    this.username = "";
    this.password = "";
  }

  login1() {
    let var1 = {
      username: this.username,
      password: this.password,
    }
    console.log("User is", var1);
    this.clearlogin();
  }

}
