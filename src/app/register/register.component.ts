import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  username1 = "";
  password1 = "";

  clearregister() {
    this.username1 = "";
    this.password1 = "";
  }

  register() {
    let var2 = {
      username1: this.username1,
      password1: this.password1,
    }
    console.log("Register user is", var2);
    this.clearregister();
  }

}
