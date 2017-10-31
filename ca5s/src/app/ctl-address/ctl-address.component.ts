import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-ctl-address",
  templateUrl: "./ctl-address.component.html",
  styleUrls: ["./ctl-address.component.css"]
})
export class CtlAddressComponent implements OnInit {
  selectedProvince: any;
  selectedCity: any;
  constructor() {}

  ngOnInit() {}
}
