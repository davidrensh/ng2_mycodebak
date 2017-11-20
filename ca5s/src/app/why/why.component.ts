import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-why",
  templateUrl: "./why.component.html",
  styleUrls: ["./why.component.css"]
})
export class WhyComponent implements OnInit {
  Arr: any;
  constructor() {
    this.Arr = Array(5).fill('');
  }

  ngOnInit() {}
}
