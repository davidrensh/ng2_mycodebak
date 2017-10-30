import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { DatePipe } from '@angular/common';
import * as firebase from 'firebase/app';
import * as g from '../global';
const PHONE_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*|\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
const MEMBER_NOT_FOUND = `Member is not exist.`;
@Component({
  selector: 'app-trans',
  templateUrl: './trans.component.html',
  styleUrls: ['./trans.component.css']
})

export class TransComponent implements OnInit {
  memberInfoList = null;
  transType = 0; // transaction type 0 add 1 redeem 2 return
  phoneemailFC = new FormControl('', [
    Validators.required,
    Validators.pattern(PHONE_EMAIL_REGEX)]);
  transTypes = g.transTypes;
  phoneemail = '';
  amount = 0;
  errMsg = '';
  memberObject: any;
  validMember = false;
  membership = null;
  memberships: any;
  amountHints = '$ Purchased';
  comment = '';
  // maininput: any;
  constructor(private router: Router, private af: AngularFireDatabase, public afAuth: AngularFireAuth, private ss: SharedService) {
    // console.log('employeeO=', this.ss.employeeO);
    // setTimeout(() => {
    //   if (this.ss.employeeO === undefined) { this.router.navigate(['/login']); }
    // }, 2000);
    if (this.ss.employeeO === undefined) {
      this.afAuth.auth.signOut();
      this.router.navigate(['/login']);
    } else {
      af.list('/membership').take(1).subscribe((s) => {
        this.memberships = s;
      });
    }
  }
  changeInput() {
    // console.log('001',this.phoneemail);
    if (this.phoneemail === '') { this.clear(); }
  }
  changeTransType(newValue) {
    this.clear();
    this.transType = newValue;    // console.log('tt', this.transType);
    switch (this.transType) {
      case 0:
        this.amountHints = '$ Purchased';
        break;
      case 1:
        this.amountHints = 'Points to redeem';
        break;
      case 2:
        this.amountHints = '$ Renew fee';
        break;
      case 3:
        this.amountHints = '$ Returned';
        break;
      default:
        break;
    }
  }
  ngOnInit() {
  }
  onFocus($event) {
    $event.target.select();
    // console.log('aaa', this.memberInfoList, this.phoneemailFC.valid, this.amount > -1, this.validMember);
    this.loadProfile();
  }
  lostFocus($event) {

    this.loadProfile();
  }
  loadProfile() {
    if (this.phoneemailFC.valid) {
      if (this.isEmail()) {
        this.getMemberInfoByNode('/u/' + this.ss.emailNode(this.phoneemail));
      } else {
        this.getMemberInfoByPhone(this.phoneemail);
      }
    }
  }
  getMemberInfoByPhone(s) {
    // console.log(this.ss.phoneNode(s));
    this.af.object('/p/' + this.ss.phoneNode(s)).take(1).subscribe((o) => {
      if (!o.$exists()) {
        this.errMsg = MEMBER_NOT_FOUND;
        this.memberInfoList = null;
      } else {
        this.getMemberInfoByNode('/u/' + this.ss.emailNode(o.e));
      }
    });
  }
  getMemberInfoByNode(n) {
    this.af.object(n).take(1).subscribe((o) => {
      if (!o.$exists()) {
        this.errMsg = MEMBER_NOT_FOUND;
        this.memberInfoList = null;
      } else {
        this.memberObject = o;
        this.errMsg = '';
        if (o.m) {
          this.getMemberInfoList(o);
        } else {
          this.errMsg = 'No membership';
          this.memberInfoList = null;
        }
      }
    });
  }
  checkMember(membership, expiry) {
    // // console.log(membership, expiry, this.memberships);
    const o = this.memberships.find(p => p.name === membership);
    this.membership = o;
    if (o.lifetime) { return true; }
    // console.log(expiry, Date.now(), expiry > Date.now());
    return expiry > Date.now();
  }

  getMemberInfoList(o) {
    const membership = o.m === undefined ? '' : o.m;
    const expiry = o.me === undefined ? '' : (new DatePipe('en-US')).transform(o.me, 'MM/dd/yyyy');
    let expiryColor = '#303f9f';
    this.validMember = this.checkMember(membership, o.me);
    if (!this.validMember) {
      expiryColor = '#d32f2f';
    }
    if (this.transType === 2) {
      this.errMsg = 'Renew fee for ' + this.membership.name + ' is $' + this.membership.renewFee;
    }
    this.memberInfoList = [
      { name: this.ss.toEmail(o.$key), color: '#7986cb' },
      { name: (o.b === undefined ? '0' : o.b) + 'ps ' + membership, color: '#5c6bc0' },
      {
        name: 'Last' + (o.l === undefined ? '' : (new DatePipe('en-US')).transform(o.l, 'MM/dd/yyyy')),
        color: '#3f51b5'
      },
      { name: 'Expiry' + expiry, color: expiryColor },
    ];
  }
  clear() {
    this.phoneemail = '';
    this.amount = 0;
    this.memberInfoList = null;
    this.validMember = false;
    this.membership = null;
    this.errMsg = '';
  }
  renewOneYear(me) {
    const currentExpiryDate = new Date(me);
    currentExpiryDate.setFullYear(currentExpiryDate.getFullYear() + 1);
    return currentExpiryDate.valueOf();
  }
  exSubmit(el) {
    if (this.memberInfoList && this.phoneemailFC.valid && this.amount > -1 && !(!this.validMember && this.transType === 0)) {
      this.submit(el);
    }
  }
  submit(el) {
    if (this.ss.employeeO === undefined) { this.router.navigate(['/login']); }
    const dnow = '/d/' + Date.now();
    let pointsChanged = 0;
    switch (this.transType) {
      case 0:
        pointsChanged = this.amount * this.membership.dpoints;
        break;
      case 1:
        pointsChanged = - this.amount;
        break;
      case 2:
        pointsChanged = this.amount * this.membership.dpoints;
        break;
      case 3:
        pointsChanged = - this.amount * this.membership.dpoints;
        break;
      default:
        break;
    }
    let mm: number = this.memberObject.b === undefined ? 0 : this.memberObject.b;
    mm = mm + pointsChanged;
    this.af.object(dnow).update({
      e: this.memberObject.$key,
      a: pointsChanged,
      i: this.transType === 1 ? 0 : this.amount,
      l: this.ss.employeeO.locationID,
      n: this.ss.employeeO.id,
      b: mm,
      t: this.transType,
      c: this.comment
    });

    this.af.object('/u/' + this.memberObject.$key).update({
      b: mm,
      l: Date.now(),
    });
    if (this.transType === 2) {
      this.af.object('/u/' + this.memberObject.$key).update({
        me: this.renewOneYear(this.memberObject.me)
      });
    }
    this.addBalanceToMainStore(this.memberObject.$key, mm);
    this.clear();
    this.changeTransType(0); // reset to purchase
    el.focus();
  }
  addBalanceToMainStore(e, balancePoints) {
    const app = this.ss.getMainDBApp(); //  firebase.initializeApp(config);
    if (app === null) {
      this.router.navigate(['/login']);
      return;
    }
    const refStore = app.database().ref('/u/' + this.ss.emailNode(e) + '/c/' + this.ss.storeSetting.name);
    const storeObj = this.af.object(refStore);
    storeObj.update({
      b: balancePoints
    });
  }
  isEmail(): boolean {
    return this.ss.isEmail(this.phoneemail);
  }
}
