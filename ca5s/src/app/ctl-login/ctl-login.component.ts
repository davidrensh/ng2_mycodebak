import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-ctl-login",
  templateUrl: "./ctl-login.component.html",
  styleUrls: ["./ctl-login.component.css"]
})
export class CtlLoginComponent implements OnInit {
  needFill = false;
  phone = "";
  password = "";
  fname = "";
  lname = "";
  email = "";
  errmsg='';
  constructor() {}

  ngOnInit() {}
  login() {}
  verify(){

  }
  forget(){

  }
}
