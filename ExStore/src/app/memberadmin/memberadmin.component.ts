import { SharedService } from '../shared.service';
import { Component, OnInit, OnDestroy, NgModule, VERSION } from '@angular/core';
import { Sort } from '@angular/material';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { AngularFireAuth } from 'angularfire2/auth';
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
function selectElementContents(el) {
  const range = document.createRange();
  range.selectNodeContents(el);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}
@Component({
  selector: 'app-memberadmin',
  templateUrl: './memberadmin.component.html',
  styleUrls: ['./memberadmin.component.css']
})
export class MemberadminComponent implements OnInit, OnDestroy {
  length = 0;
  sub1: Subscription;
  sub2: Subscription;
  pageSize = 10;
  email = '';
  phone = '';
  points = 0;
  membership = '';
  expiry = '';
  lastVisit = '';
  store = '';
  items: FirebaseListObservable<any>;
  data: any;
  dataAll: any;
  currentPage: any = null;
  constructor(private af: AngularFireDatabase, public afAuth: AngularFireAuth, private ss: SharedService, private router: Router) {
    if (this.ss.storeSetting) {
      this.store = this.ss.storeSetting.name;
      this.sub1 = this.af.object('uCount').subscribe(s => {
        // // console.log(s);
        this.length = s.$value;
      });
      this.loadData();
    } else {
      this.afAuth.auth.signOut();
      this.router.navigate(['/login']);
    }
  }
  change(e, s, v) { // filter
    // // console.log(e, s, v, v.toString());
    // // console.log((new Date(v)).valueOf());
    if (v === '' || v === null || v === undefined) {
      this.toPage();
    } else {
      if ('_me_l_'.indexOf('_' + s + '_') < 0) {
        this.data = this.data.filter((elem) => {
          // // console.log('11', elem);
          return (elem[s] === undefined || elem[s] === null ? '' : elem[s])
            .toString().toLowerCase().indexOf((v === null ? '' : v).toString().toLowerCase()) > -1;
        });
      } else {
        this.data = this.dataAll.filter((elem) => {
          // console.log('22', s, elem[s], (new Date(v)).valueOf(), this.rdate(elem[s]), this.rdate(v));
          return this.rdate(elem[s]) === this.rdate(v);
          // (elem[s] === undefined ? '' : this.rdate(elem[s])).toString() === this.rdate(v).toString();
        });
        // this.toPage();
      }
    }
  }

  pageChange(e) {
    // console.log(e);
    this.currentPage = e;
    const startIndex = e.pageIndex * e.pageSize;
    this.data = this.dataAll.slice(startIndex, startIndex + e.pageSize);
  }
  loadData() {
    this.items = this.af.list('/u');
    this.sub2 = this.items.subscribe(s => {
      this.dataAll = s;
      this.toPage();
    });
  }
  toPage() {
    if (this.currentPage === null) {
      this.data = this.dataAll.slice(0, this.pageSize);
    } else {
      this.pageChange(this.currentPage);
    }
  }
  onFocus(e) {
    // console.log(e);
    // e.target.childNodes[0].select();
    selectElementContents(e.target.childNodes[0]);
  }
  leave(e, a, key) {
    let newValue = '';

    newValue = e.target.childNodes[0].data;
    if (key === 'p' && newValue !== '' && newValue !== a.p) {
      this.af.object('/u/' + a.$key).update({
        [key]: newValue
      });
      this.af.object('/p/' + this.ss.phoneNode(a.p)).remove();
      this.af.object('/p/' + this.ss.phoneNode(newValue)).update({
        e: a.$key
      });
      // !@#$% update main db
    }
  }
  delete(o) {
    // console.log('delete', o);
    this.af.object('/u/' + o.$key).remove();
    this.dataAll = this.dataAll.filter(function (el) {
      return el.$key !== o.$key;
    });
  }
  rdate(d) {
    return (new DatePipe('en-US')).transform(d, 'MM/dd/yyyy');
  }
  sortData(sort: Sort) {
    const d = this.dataAll;
    if (!sort.active || sort.direction === '') {
      this.dataAll = d;
    } else {
      this.dataAll = d.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'b':
          case 'me':
          case 'l':
            return compare(+a[sort.active], +b[sort.active], isAsc);
          default: return compare(a[sort.active], b[sort.active], isAsc);
        }
      });
    }
    this.toPage();
  }
  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.sub1) { this.sub1.unsubscribe(); }
    if (this.sub2) { this.sub2.unsubscribe(); }
  }
}
