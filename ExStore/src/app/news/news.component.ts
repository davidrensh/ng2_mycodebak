import { Component, OnInit } from '@angular/core';
import { SafeHtml } from '../safehtml';
import { SharedService } from '../shared.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  title = '';
  location = '';
  des = '';
  shortDes = '';
  store = '';
  hist: any;
  mainDBApp: any;
  more = false;
  more2 = false;
  city = '';
  category = '';
  constructor(private af: AngularFireDatabase, public afAuth: AngularFireAuth,
     private safeHtml: SafeHtml, private ss: SharedService, private router: Router) {
    if (this.ss.storeSetting) {
      this.store = this.ss.storeSetting.name;
      const branches  = this.af.list('/branches');
      branches.subscribe(p => {
        // console.log('aa', p);
        const b = p.filter((e) => {
          // console.log('bb', e, e.locationID, this.ss.employeeO.locationID);
          return e.locationID === this.ss.employeeO.locationID;
        });
        this.city = b[0].city ? b[0].city : '';
        this.category = b[0].category ? b[0].category : '';
      });
    } else {
      this.afAuth.auth.signOut();
      this.router.navigate(['/login']);
    }
    this.mainDBApp = this.ss.getMainDBApp();
    if (this.mainDBApp === null) {
      this.router.navigate(['/login']);
      return;
    } else {
      const res = this.mainDBApp.database().ref('/news/').orderByChild('store')
        .equalTo(this.store);
      res.once('value', p => {
        const ref = p.ref;
        this.hist = this.af.list(ref);
      });
    }
  }
  isHtml() {
    if (this.des.indexOf('<') > -1 && this.des.indexOf('</') > -1) {
      return true;
    } else {
      return false;
    }
  }
  ngOnInit() {
  }
  save() {
    // console.log('news1');
    if (this.ss.employeeO === undefined) { this.router.navigate(['/login']); }
    const dt = Date.now();
    const ref = this.mainDBApp.database().ref('/news/' + dt);
    // console.log('news12', this.ss.employeeO.id, this.store);
    const newsObj = this.af.object(ref).update({
      store: this.store,
      title: this.title,
      location: this.location,
      short: this.shortDes,
      // des: this.des,
      city: this.city,
      category: this.category,
      publishedby: this.ss.employeeO.id,
    });
    const refDetail = this.mainDBApp.database().ref('/newsdetail/' + dt);
    // console.log('news12', this.ss.employeeO.id, this.store);
    const newsObjDetail = this.af.object(refDetail).update({
      des: this.des,
    });

    this.title = '';
    this.location = '';
    this.des = '';
    this.shortDes = '';
  }
  getDTString(d) {
    return new Date(Number(d)).toISOString().slice(0, 19).replace('T', ' ');
  }
}
