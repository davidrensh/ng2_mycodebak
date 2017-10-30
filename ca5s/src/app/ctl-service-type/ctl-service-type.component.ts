import { Component, Input, OnInit } from "@angular/core";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { CATEGORIES, COMAPRE } from "../global";
@Component({
  selector: "app-ctl-service-type",
  templateUrl: "./ctl-service-type.component.html",
  styleUrls: ["./ctl-service-type.component.css"]
})
export class CtlServiceTypeComponent implements OnInit {
  readonly categories = CATEGORIES.sort((a, b) => {
    const isAsc = "asc" === "asc";
    return COMAPRE(
      String(a.name).toLowerCase(),
      String(b.name).toLowerCase(),
      isAsc
    );
  });
  @Input() oricategory: any;
  category: any;
  constructor(private route: ActivatedRoute, private router: Router) {}
  goto(f, r) {
    this.category = r;
    this.oricategory = r;
    if (f === "") {
      let s = this.router.routerState.snapshot.url;
      let s1 = this.router.routerState.snapshot.url
        .replace("/quote/false", "")
        .replace("/quote/true", "");
      s = s.replace(s1, "");
      f = s;
      if (!f) {
        return;
      }
    }
    // console.log("fff=", f + "/" + r);
    this.router.navigate([f + "/" + r]);
  }
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const s = this.router.routerState.snapshot.url
          .replace("/quote/false", "")
          .replace("/quote/true", "")
          .replace("/", "");
        if (s !== "") {
          const a = this.categories.find(p => p.route === s);
          if (a) {
            this.category = s;
            this.oricategory = s;
            this.goto("", this.category);
          }else {
            return;
          }
        } else {
          if (this.category) {
            this.oricategory = this.category;
            this.goto("", this.category);
          } else {
            this.category = this.oricategory;
            this.goto("", this.oricategory);
          }
        }
      }
    });
    this.category = this.oricategory;
  }
}
