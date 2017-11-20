import { Component, OnInit } from "@angular/core";
import { CtlAddressComponent } from "../ctl-address/ctl-address.component";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { DISTANCE } from "../global";
declare var google: any;
@Component({
  selector: "app-moving",
  templateUrl: "./moving.component.html",
  styleUrls: ["./moving.component.css"]
})
export class MovingComponent implements OnInit {
  fromApt = false;
  fromAddr = '';
  toAddr = '';
  fromPos: any;
  toPos: any;
  toApt = false;

  hasContact = false;
  minDate: any;
  fgMoving: FormGroup;
  isPack: boolean;
  smallItems = 0;
  bigItems = 0;
  totalItems = 0;
  distance = '';
  distanceX = '';
  fromFloor: string;
  toFloor: string;
  constructor(fb: FormBuilder) {
    this.minDate = this.setDateWithVar(new Date(), 1);
    this.fgMoving = fb.group(
      {
        isPack: new FormControl()
      },
      { updateOn: "submit" }
    );
    // fill address with last address by default
  }
  setDateWithVar(d, daysAdd) {
    if (d !== null) {
      const et = new Date(d.valueOf());
      et.setDate(et.getDate() + daysAdd);
      return et;
    }
  }
  loadDistance() {
    // console.log("11");
    this.getPosition();
    // console.log("res1", this.fromPos, this.toPos);
    setTimeout(() => {
      // console.log("res2", this.fromPos, this.toPos,this.fromPos.lat);
      if (this.fromPos && this.toPos) {
        this.getDistance(
          this.fromPos.lat,
          this.fromPos.lng,
          this.toPos.lat,
          this.toPos.lng
        );
      }
    }, 500);
    //, this.getDistance(f.lat, f.lng, t.lat, t.lng)
  }
  getPosition() {
    if (this.fromAddr.trim() === "" || this.toAddr.trim() === "") {
      return null;
    }
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: this.fromAddr }, (results, status) => {
      const lat = results[0].geometry.location.lat();
      const lng = results[0].geometry.location.lng();
      this.fromPos = { lat: lat, lng: lng };
    });
    geocoder.geocode({ address: this.toAddr }, (results, status) => {
      const lat = results[0].geometry.location.lat();
      const lng = results[0].geometry.location.lng();
      this.toPos = { lat: lat, lng: lng };
    });
  }
  getDistance(lat1, lng1, lat2, lng2) {
    // console.log(lat1, lat2, lng1, lng2);
    this.distance = DISTANCE({
      lat1: lat1,
      lng1: lng1,
      lat2: lat2,
      lng2: lng2
    });
    this.distanceX = "(" + this.distance + "km)";
  }
  submit() {
    console.log("UUUU");
  }
  ngOnInit() {}
}
