import { Component, OnInit } from "@angular/core";
import { CtlAddressComponent } from "../ctl-address/ctl-address.component";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";

@Component({
  selector: 'app-roofing',
  templateUrl: './roofing.component.html',
  styleUrls: ['./roofing.component.css']
})
export class RoofingComponent implements OnInit {

  fromAddr = '';
  hasContact = false;
  minDate: any;
  fgRoof: FormGroup;
  lenNS = 0;
  lenWE = 0;

  constructor(fb: FormBuilder) {
    this.minDate = this.setDateWithVar(new Date(), 1);
    this.fgRoof = fb.group(
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


  submit() {
    console.log("UUUU");
  }
  ngOnInit() {}
}
