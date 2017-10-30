import { SharedService } from '../shared.service';
import { Component, OnInit, NgModule, VERSION } from '@angular/core';
import { Sort } from '@angular/material';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
// import { Subscription } from 'rxjs/Subscription';
import { DatePipe } from '@angular/common';
import * as g from '../global';
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
@Component({
  selector: 'app-memberhist',
  templateUrl: './memberhist.component.html',
  styleUrls: ['./memberhist.component.css']
})
export class MemberhistComponent implements OnInit {
  // private sub: Subscription;
  memberID = '';
  store = '';
  totalCount = 0;
  total$ = 0;
  length = 0;
  pageSize = 10;
  transTypes = g.transTypes;
  data: any;
  dataAll: any;
  currentPage: any = null;

  memberInfoList = null;
  transType = 0; // transaction type 0 add 1 redeem 2 return
  memberObject: any;
  validMember = false;
  membership = null;
  memberships: any;
  constructor(private ss: SharedService,
    public af: AngularFireDatabase, private route: ActivatedRoute) {
    af.list('/membership').take(1).subscribe((s) => {
      this.memberships = s;
    });
  }
  // ngOnDestroy() {
  //   if (this.sub) { this.sub.unsubscribe(); }
  // }
  ngOnInit() {
     this.route.params.take(1).subscribe(params => {
      this.memberID = params['id'];
      this.store = params['store'];
      // console.log(this.memberID, this.store);
      this.showRpt();
      this.af.object('/u/' + this.ss.emailNode(this.memberID)).take(1).subscribe(p => {
        this.getMemberInfoList(p);
      });
    });
  }
  toEmail(s) {
    return this.ss.toEmail(s);
  }
  checkMember(membership, expiry) {
    const o = this.memberships.find(p => p.name === membership);
    this.membership = o;
    if (o.lifetime) { return true; }
    return expiry > Date.now();
  }
  getMemberInfoList(o) {
    const membership = o.m === undefined ? '' : o.m;
    const expiry = o.me === undefined ? '' : (new DatePipe('en-US')).transform(o.me, 'MM/dd/yyyy');
    let expiryColor = '#303f9f';
    this.validMember = this.checkMember(membership, o.me);
    if (!this.validMember && this.transType === 0) {
      expiryColor = '#d32f2f';
    }
    this.memberInfoList = [
      { name: this.ss.toEmail(o.$key), color: '#7986cb' },
      { name: (o.b === undefined ? '0' : o.b) + 'ps ' + membership, color: '#5c6bc0' },
      {
        name: 'Last:' + (o.l === undefined ? '' : (new DatePipe('en-US')).transform(o.l, 'MM/dd/yyyy')),
        color: '#3f51b5'
      },
      { name: 'Expiry:' + expiry, color: expiryColor },
    ];
  }
  getTransType(t) {
    const a = this.transTypes.find(p => p.value === t);
    return a ? a.viewValue : '';
  }
  pageChange(e) {
    // console.log(e);
    this.currentPage = e;
    const startIndex = e.pageIndex * e.pageSize;
    this.data = this.dataAll.slice(startIndex, startIndex + e.pageSize);
  }

  toPage() {
    if (this.currentPage === null) {
      this.data = this.dataAll.slice(0, this.pageSize);
    } else {
      this.pageChange(this.currentPage);
    }
  }
  showRpt() {
    const dataO = this.af.list('/d', {
      query: {
        orderByChild: 'e',
        equalTo: this.ss.emailNode(this.memberID),
      }
    });
    dataO.take(1).subscribe(p => {
      this.dataAll = p;
      this.length = this.dataAll.length;
      this.totalCount = this.dataAll.length;
      this.total$ = this.dataAll.reduce(function (cnt, o) { return cnt + (o.i ? Number(o.i) : 0); }, 0);
      const st: Sort = { active: '$key', direction: 'desc' };
      // st.active = '$key';
      // st.direction = 'desc';

      this.sortData(st);
      this.toPage();
      // // console.log('01', this.dataAll);
    });
    // // console.log('00', this.data);
  }

  getDTString(d) {
    return new Date(Number(d)).toISOString().slice(0, 16).replace('T', ' ');
  }
  sortData(sort: Sort) {
    const d = this.dataAll;
    if (!sort.active || sort.direction === '') {
      this.dataAll = d;
    } else {
      this.dataAll = d.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'a':
          case 'b':
          case 'i':
          case '$key':
          case 't':
            return compare(+a[sort.active], +b[sort.active], isAsc);
          default: return compare(a[sort.active], b[sort.active], isAsc);
        }
      });
    }
    this.toPage();
  }
}
