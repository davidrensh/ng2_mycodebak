import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
// import { ReCAPTCHA } from './recaptcha';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import * as g from '../global';
// const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
// const PHONE_REGEX = /\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
const MEMBER_NOT_FOUND = `Member is not exist.`;

@Component({
  selector: 'app-addmember',
  templateUrl: './addmember.component.html',
  providers: [AngularFireAuth],
  styleUrls: ['./addmember.component.css']
})
export class AddmemberComponent implements OnInit, OnDestroy {
  emailFC = new FormControl('', [
    Validators.required,
    Validators.pattern(g.EMAIL_REGEX)]);
  phoneFC = new FormControl('', [
    Validators.required,
    Validators.pattern(g.PHONE_REGEX)]);
  email = '';
  phone = '';
  password = '';
  errmsg = '';
  membership = '';
  memberships: any;
  branches: any;
  city = '';
  constructor(private af: AngularFireDatabase, public afAuth: AngularFireAuth, private ss: SharedService,
    private router: Router) {
    // console.log('00', this.ss.storeSetting);
    if (!this.ss.storeSetting) {
      this.afAuth.auth.signOut();
      this.router.navigate(['/login']);
    } else {
      this.memberships = this.af.list('/membership');
      this.branches = this.af.list('/branches');
      this.branches.subscribe(p => {
        // console.log('aa', p);
        const b = p.filter((e) => {
          // console.log('bb', e, e.locationID, this.ss.employeeO.locationID);
          return e.locationID === this.ss.employeeO.locationID;
        });
        this.city = b[0].city ? b[0].city : '';
      });
    }
  }
  validInput() {
    return this.emailFC.valid && this.phoneFC.valid;
  }
  emailNode(s) {
    return '/u/' + this.ss.emailNode(s);
  }
  phoneNode() {
    return '/p/' + this.ss.phoneNode(this.phone);
  }
  addMember(s) {
    this.addUserToLocalDb(this.af.object(this.emailNode(s)), this.af.object(this.phoneNode()), s, this.phone);
  }

  afterAdd() {
    this.email = '';
    this.phone = '';
    this.password = '';
    this.membership = '';
  }
  failedAdd() {
  }
  getExpiryDate() {
    const aYearFromNow = new Date();
    aYearFromNow.setFullYear(aYearFromNow.getFullYear() + 1);
    return aYearFromNow.valueOf();
  }
  addUserToLocalDb(o, p, email, phone) {
    // console.log('44', this.city);
    o.update({
      // e: email,
      p: phone,
      m: this.membership,
      me: this.getExpiryDate()
    });
    p.update({
      e: email,
    });
    const userCountRef = this.af.app.database().ref('uCount');
    userCountRef.transaction(function (current_value) {
      return (current_value || 0) + 1;
    });
  }
  addUserToDb(o, p, email, phone) {
    // console.log('00', this.city);
    o.update({
      p: phone,
      c: this.city
    });
    p.update({
      e: email,
    });
  }
  addToMainDb() {
    const app = this.ss.getMainDBApp(); //  firebase.initializeApp(config);
    // console.log('0', app);
    if (app === null) {
      this.router.navigate(['/login']);
      return;
    }
    // console.log(app);
    // console.log('email000=', this.email);
    const _e = this.email;
    const _p = this.password;
    const _phone = this.phone;
    const ref = app.database().ref('/u/' + this.ss.emailNode(this.email));
    const emailObj = this.af.object(ref);
    // const refStore = app.database().ref('/u/' + this.ss.emailNode(this.email) + '/c/' + this.ss.storeSetting.name);
    // const storeObj = this.af.object(refStore);
    const refPhone = app.database().ref('/p/' + this.ss.phoneNode(this.phone));
    const phoneObj = this.af.object(refPhone);
    const s = emailObj.take(1).subscribe(data => {
      if (!data.$exists()) {
        // console.log('email=', this.email, '_e', _e);
        app.auth().createUserWithEmailAndPassword(_e, _p).then(
          (authdata) => {
            // console.log('email2=', this.ss.storeSetting, emailObj, phoneObj);
            this.addUserToDb(emailObj, phoneObj, _e, _phone);
            // storeObj.update({
            //   // name: this.ss.storeSetting.name, // cf.storeName,
            //   url: this.ss.storeSetting.url // cf.storeUrl
            // });
            this.errmsg = '';
            //s.unsubscribe();
          }).catch((error) => {
            this.errmsg = error.toString();
            console.log('Error creating user:', error);
          });

      } else {
        // 'Email is exist.', add store into that member
        this.addUserToDb(emailObj, phoneObj, _e, _p);
        // storeObj.update({
        //   url: this.ss.storeSetting.url // cf.storeUrl
        // });
      }
    });
  }

  add() {
    if (!this.validInput()) { return; }
    const s = this.af.object('/u/' + this.ss.emailNode(this.email)).take(1).subscribe((o) => {
      if (o.$exists()) {
        this.errmsg = 'Email is exist.';
      } else {
        // console.log('22', this.city);
        this.addMember(this.email);
        this.addToMainDb();
        this.afterAdd();
      }
    });

  }
  ngOnInit() {
  }
  ngOnDestroy() {
  }
}
