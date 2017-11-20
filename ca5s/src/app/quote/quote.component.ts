import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
// import { PROVINCES } from '../global';
// declare var google: any;
// function compare(a, b, isAsc) {
//   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
// }

@Component({
  selector: "app-quote",
  templateUrl: "./quote.component.html",
  styleUrls: ["./quote.component.css"]
})
export class QuoteComponent implements OnInit {
  isCommercial = null;
  isLogin = false;
  // firstFormGroup: FormGroup;
  // secondFormGroup: FormGroup;
  // readonly provinces = PROVINCES;
  // readonly allCities = CITIES;
  // readonly categories = CATEGORIES.sort((a, b) => {
  //   const isAsc = 'asc' === 'asc';
  //   return COMAPRE(
  //     String(a.name).toLowerCase(),
  //     String(b.name).toLowerCase(),
  //     isAsc
  //   );
  // });
  cities: any;
  selectedProvince: any = null;
  selectedCity: any = null;
  postcode = "";
  address = "";
  lat: any;
  long: any;
  cat = "";
  constructor(private route: ActivatedRoute, private router: Router) {
    // this.cat = null;
    // console.log('1',this.category);
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(position => {
    //     // console.log(position.coords);
    //     this.lat = position.coords.latitude;
    //     this.long = position.coords.longitude;
    //   });

    // }

    this.route.params.subscribe(params => {
      this.isCommercial = params["commercial"];
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.cat = this.router.routerState.snapshot.url
          .replace("/quote", "")
          .replace("/false", "")
          .replace("/true", "")
          .replace("/", "");
      }
    });
  }

  ngOnInit() {}
}
