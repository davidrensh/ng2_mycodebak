import { Component, OnInit } from '@angular/core';
import { SafeHtml } from '../safehtml';
import { SharedService } from '../shared.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
  selector: 'app-flyers',
  templateUrl: './flyers.component.html',
  styleUrls: ['./flyers.component.css']
})
export class FlyersComponent implements OnInit {
  title = '';
  location = '';
  des = '';
  shortDes = '';
  store = '';
  pages: any = [];
  hist: any;
  mainDBApp: any;
  city = '';
  category = '';
  constructor(private af: AngularFireDatabase, public afAuth: AngularFireAuth,
    private safeHtml: SafeHtml, private ss: SharedService, private router: Router) {
    if (this.ss.storeSetting) {
      this.store = this.ss.storeSetting.name;
      const branches = this.af.list('/branches');
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
      const res = this.mainDBApp.database().ref('/flyers/').orderByChild('store')
        .equalTo(this.store);
      res.once('value', p => {
        console.log('pf', p);
        const ref = p.ref;
        this.hist = this.af.list(ref);
      });
    }
  }
  isHtml(s) {
    if (s.indexOf('<') > -1 && s.indexOf('</') > -1) {
      return true;
    } else {
      return false;
    }
  }
  ngOnInit() {
  }
  deletePage(i) {
    this.pages.splice(i, 1);
  }
  addPage() {
    this.pages.push({ des: this.des });
    // console.log(this.pages);
    this.des = '';
  }
  save() {
    const app = this.ss.getMainDBApp();
    if (app === null) {
      this.router.navigate(['/login']);
      return;
    }
    if (this.ss.employeeO === undefined) { this.router.navigate(['/login']); }
    const t = Date.now();
    const ref = app.database().ref('/flyers/' + t);
    const newsObj = this.af.object(ref).update({
      store: this.store,
      title: this.title,
      city: this.city,
      category: this.category,
      publishedby: this.ss.employeeO.id,
    });
    for (let index = 0; index < this.pages.length; index++) {
      const iref = app.database().ref('/flyersdetail/' + t + '/' + index);
      const obj = this.af.object(iref).update({
        des: this.pages[index].des,
      });
    }

    this.title = '';
    this.des = '';
    this.pages = [];
  }
  getDTString(d) {
    return new Date(Number(d)).toISOString().slice(0, 19).replace('T', ' ');
  }
}