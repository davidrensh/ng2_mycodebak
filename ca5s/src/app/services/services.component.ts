import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { CATEGORIES, COMAPRE } from "../global";
@Component({
  selector: "app-services",
  templateUrl: "./services.component.html",
  styleUrls: ["./services.component.css"]
})
export class ServicesComponent implements OnInit {
  readonly categories = CATEGORIES.sort((a, b) => {
    const isAsc = "asc" === "asc";
    return COMAPRE(
      String(a.name).toLowerCase(),
      String(b.name).toLowerCase(),
      isAsc
    );
  });
  constructor(private route: ActivatedRoute, private router: Router) {}
  goto(r) {
    this.router.navigate(["/quote/false/" + r]);
    console.log(r);
    // this.router.navigate(["./" + r], { relativeTo: this.route });
  }
  ngOnInit() {}
}
