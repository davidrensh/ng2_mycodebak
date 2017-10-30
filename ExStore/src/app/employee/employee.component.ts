import { SharedService } from '../shared.service';
import { Component, OnInit, OnDestroy, NgModule, VERSION } from '@angular/core';
import { Sort } from '@angular/material';
import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Subscription } from 'rxjs/Subscription';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormControl, Validators } from '@angular/forms';
import * as g from '../global';
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
function selectElementContents(el) {
  var range = document.createRange();
  range.selectNodeContents(el);
  var sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, OnDestroy {
  emailFC = new FormControl('', [
    Validators.required,
    Validators.pattern(g.EMAIL_REGEX)]);
  phoneFC = new FormControl('', [
    Validators.required,
    Validators.pattern(g.PHONE_REGEX)]);
  items: FirebaseListObservable<any>;
  errmsg = '';
  sub: Subscription;
  data: any;
  locationID = '';
  email = '';
  phone = '';
  password = '';
  id = '';
  active = true;
  level = 1;

  // defaultText = '';
  // lll = '';
  branches: any;
  roles = [
    { value: 1, viewValue: 'Employee' },
    { value: 10, viewValue: 'Manager' }
  ];
  constructor(private af: AngularFireDatabase, public afAuth: AngularFireAuth, private ss: SharedService, private router: Router) {
    this.loadData();
  }
  loadData() {
    this.items = this.af.list('/employees');
    this.sub = this.items.subscribe(s => {
      this.data = s.filter((e) => {
        return !e.administrator && (typeof e.deleted === 'boolean' && !e.deleted);
      });
    });
    this.branches = this.af.list('/branches');
  }
  validInput() {
    return this.emailFC.valid && this.phoneFC.valid && this.id.trim() && this.locationID.trim() && this.password.trim();
  }
  addRow(e) {
    if (!this.ss.isValidKey(this.ss.emailNode(this.email))) {
      this.errmsg = 'Invalid email!';
      return;
    }
    this.af.object('/employees/' + this.ss.emailNode(this.email)).take(1).subscribe(p => {
      if (!p.$exists()) {
        this.addEmployeeLoginToLocalDB(this.email, this.password);
      }
    })

    this.addToMainDb(this.email, this.password, this.phone);
    // // console.log('addRow', e);
    // // console.log(this. email, this.locationID);
    // if (this.email === '') { // console.log('RETURN'); return; }
    this.af.object('/employees/' + this.ss.emailNode(this.email)).update({
      email: this.email,
      phone: this.phone,
      id: this.id,
      locationID: this.locationID,
      active: this.active,
      level: this.level,
      deleted: false
    }).then(_ => {
      // console.log('update!');
      this.email = '';
      this.locationID = '';
      this.id = '';
      this.active = true;
      this.level = 1;
      this.phone = '';
      this.password = '';
      this.loadData();
    }
      );

  }
  addEmployeeLoginToLocalDB(_e, _p) {
    this.afAuth.auth.createUserWithEmailAndPassword(_e, _p).then(
      (authdata) => {
        this.errmsg = '';
      }).catch((error) => {
        this.errmsg = error.toString();
      });
  }
  addUserToDb(o, p, email, phone, l, active) {
    o.update({
      p: phone,
      l: l,
      a: active,
      d: false
    });
    p.update({
      e: email,
    });
  }
  addToMainDb(_e, _p, _phone) {
    const app = this.ss.getMainDBApp(); //  firebase.initializeApp(config);
    if (app === null) {
      this.router.navigate(['/login']);
      return;
    }
    const ref = app.database().ref('/c/' + this.ss.storeSetting.name + '/e/' + this.ss.emailNode(_e));
    const emailObj = this.af.object(ref);
    // const refStore = app.database().ref('/c/' + this.ss.storeSetting.name + '/s');
    // const storeObj = this.af.object(refStore);
    const refPhone = app.database().ref('/c/' + this.ss.storeSetting.name + '/p/' + this.ss.phoneNode(_phone));
    const phoneObj = this.af.object(refPhone);
    const s = emailObj.take(1).subscribe(data => {
      if (!data.$exists()) {
        // console.log('email=', this.email, '_e', _e);
        app.auth().createUserWithEmailAndPassword(_e, _p).then(
          (authdata) => {
            // console.log('email2=', this.ss.storeSetting, emailObj, phoneObj);
            this.addUserToDb(emailObj, phoneObj, _e, _phone, this.level, this.active);
            // storeObj.update({
            //   // name: this.ss.storeSetting.name, // cf.storeName,
            //   url: this.ss.storeSetting.url // cf.storeUrl
            // });
            this.errmsg = '';
            //s.unsubscribe();
          }).catch((error) => {
            this.errmsg = error.toString();
            // console.log('Error creating user:', error);
          });

      } else {
        // 'Email is exist.', add store into that member
        // console.log('pur add to main');
        this.addUserToDb(emailObj, phoneObj, _e, _p, this.level, this.active);
        // storeObj.update({
        //   url: this.ss.storeSetting.url // cf.storeUrl
        // });
      }
    });
  }
  onFocus(e) {
    // console.log(e);
    // e.target.childNodes[0].select();
    selectElementContents(e.target.childNodes[0]);
  }
  leave(e, a, key) {
    let newValue = '';
    if (key !== 'locationID' && key !== 'active' && key !== 'level') {
      newValue = e.target.childNodes[0].data;
      if (newValue === '' || newValue === a[key]) { return; }
      if (key === 'email') {
        this.af.object('/employees/' + this.ss.emailNode(newValue)).update({
          email: newValue,
        });
        this.af.object('/employees/' + this.ss.emailNode(a.email)).remove();
      } else {
        this.af.object('/employees/' + this.ss.emailNode(a.email)).update({
          [key]: newValue
        });
      }
    } else {
      if (key === 'active') { newValue = e.checked; } else {
        newValue = e.value;
      }
      // console.log('aaa', a.email, newValue, e, a, key);
      if (newValue === '') { return; }
      this.af.object('/employees/' + this.ss.emailNode(a.email)).update({
        [key]: newValue
      });
    }
  }
  delete(o) {
    // console.log('delete', o);
    this.af.object('/employees/' + this.ss.emailNode(o.email)).update({
      deleted: true
    });
    this.data = this.data.filter(function (el) {
      return el.email !== o.email;
    });
    const app = this.ss.getMainDBApp(); //  firebase.initializeApp(config);
    if (app === null) {
      this.router.navigate(['/login']);
      return;
    }
    const ref = app.database().ref('/c/' + this.ss.storeSetting.name + '/e/' + this.ss.emailNode(o.email));
    this.af.object(ref).update({
      d: true
    });
  }

  sortData(sort: Sort) {
    // // console.log(sort.active, sort);
    // this.items = this.af.list('/branches', {
    //   query: {
    //     orderByChild: sort.direction === 'asc' ? sort.active : ''
    //   }
    // });
    const d = this.data;
    if (!sort.active || sort.direction === '') {
      this.data = d;
      return;
    }

    this.data = d.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      // console.log(sort.active, a[sort.active]);
      return compare(String(a[sort.active]).toLowerCase(), String(b[sort.active]).toLowerCase(), isAsc);
      // switch (sort.active) {
      //   case 'email': return compare(a.email, b.email, isAsc);
      //   case 'locationID': return compare(a.locationID, b.locationID, isAsc);
      //   // case 'fat': return compare(+a.fat, +b.fat, isAsc);
      //   // case 'carbs': return compare(+a.carbs, +b.carbs, isAsc);
      //   // case 'protein': return compare(+a.protein, +b.protein, isAsc);
      //   default: return 0;
      // }
    });
  }
  ngOnInit() {
  }
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
