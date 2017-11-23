import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Directive,
  ViewChild
} from "@angular/core";
import { CtlAddressComponent } from "../ctl-address/ctl-address.component";
import { CtlUploadImgComponent } from "../ctl-upload-img/ctl-upload-img.component";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { GUID } from "../global";
@Component({
  selector: "app-eavestrough",
  templateUrl: "./eavestrough.component.html",
  styleUrls: ["./eavestrough.component.css"]
})
export class EavestroughComponent implements OnInit, OnDestroy {
  @ViewChild("loadImage") loadImage: CtlUploadImgComponent;
  fromAddr = "";
  hasContact = false;
  minDate: any;

  fgRoof: FormGroup;
  lenNS = 0;
  lenWE = 0;
  nodeid = "";
  startDate: any;
  saved: false;
  constructor(fb: FormBuilder) {
    this.nodeid = GUID();
    // console.log("xxx=", this.nodeid);
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
  ngOnDestroy() {
    if (!this.saved) {
      this.loadImage.deleteAll();
    }
  }
}
