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
function selectElementContents(el) {
  var range = document.createRange();
  range.selectNodeContents(el);
  var sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}
@Component({
  selector: "app-renovations",
  templateUrl: "./renovations.component.html",
  styleUrls: ["./renovations.component.css"]
})
export class RenovationsComponent implements OnInit, OnDestroy {
  @ViewChild("loadImage") loadImage: CtlUploadImgComponent;
  fromAddr = "";
  hasContact = false;
  minDate: any;
  matReq = true;
  fgRoof: FormGroup;
  width = 0;
  height = 0;
  length = 0;
  req = "";
  data = [];
  roomTypes = [
    { value: "Bedroom" },
    { value: "Living room" },
    { value: "Bathroom" },
    { value: "Kitchen" },
    { value: "Dining room" },
    { value: "Family room" },
    { value: "Den" },
    { value: "Other" }
  ];
  roomType: any;
  renoTypes = ["Wall", "Floor/Carpet", "Ceiling", "Other"];
  renoSelected: any; //= new FormControl();
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
  getTotal() {
    return 0;
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
  validInput() {
    return true;
    // return this.emailFC.valid && this.phoneFC.valid && this.id.trim() && this.locationID.trim() && this.password.trim();
  }
  addRow(e) {
    this.data.push({
      rmType: this.roomType,
      rnType: this.renoSelected,
      l: this.length,
      w: this.width,
      h: this.height,
      req: this.req
    });
    // if (!this.ss.isValidKey(this.ss.emailNode(this.email))) {
    //   this.errmsg = 'Invalid email!';
    //   return;
    // }
    // this.af.object('/employees/' + this.ss.emailNode(this.email)).take(1).subscribe(p => {
    //   if (!p.$exists()) {
    //     this.addEmployeeLoginToLocalDB(this.email, this.password);
    //   }
    // })
    // this.addToMainDb(this.email, this.password, this.phone);
    // // console.log('addRow', e);
    // // console.log(this. email, this.locationID);
    // if (this.email === '') { // console.log('RETURN'); return; }
  }

  onFocus(e) {
    // console.log(e);
    // e.target.childNodes[0].select();
    selectElementContents(e.target.childNodes[0]);
  }
  leave(e, a, key) {
    // let newValue = '';
    // if (key !== 'locationID' && key !== 'active' && key !== 'level') {
    //   newValue = e.target.childNodes[0].data;
    //   if (newValue === '' || newValue === a[key]) { return; }
    //   if (key === 'email') {
    //     this.af.object('/employees/' + this.ss.emailNode(newValue)).update({
    //       email: newValue,
    //     });
    //     this.af.object('/employees/' + this.ss.emailNode(a.email)).remove();
    //   } else {
    //     this.af.object('/employees/' + this.ss.emailNode(a.email)).update({
    //       [key]: newValue
    //     });
    //   }
    // } else {
    //   if (key === 'active') { newValue = e.checked; } else {
    //     newValue = e.value;
    //   }
    //   // console.log('aaa', a.email, newValue, e, a, key);
    //   if (newValue === '') { return; }
    //   this.af.object('/employees/' + this.ss.emailNode(a.email)).update({
    //     [key]: newValue
    //   });
    // }
  }
  delete(o) {
    // console.log('delete', o);
    // this.af.object('/employees/' + this.ss.emailNode(o.email)).update({
    //   deleted: true
    // });
    // this.data = this.data.filter(function (el) {
    //   return el.email !== o.email;
    // });
    // const app = this.ss.getMainDBApp(); //  firebase.initializeApp(config);
    // if (app === null) {
    //   this.router.navigate(['/login']);
    //   return;
    // }
    // const ref = app.database().ref('/c/' + this.ss.storeSetting.name + '/e/' + this.ss.emailNode(o.email));
    // this.af.object(ref).update({
    //   d: true
    // });
  }

  ngOnInit() {}
  ngOnDestroy() {
    if (!this.saved) {
      this.loadImage.deleteAll();
    }
  }
}
