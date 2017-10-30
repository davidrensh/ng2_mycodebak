import { Component, OnInit } from '@angular/core';
// import { Subscription } from 'rxjs/Subscription';
import { Sort } from '@angular/material';

import { Observable } from 'rxjs/Rx';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
@Component({
  selector: 'app-my',
  templateUrl: './my.component.html',
  styleUrls: ['./my.component.css']
})
export class MyComponent implements OnInit {
  memberID = '';
  stores: any;
  allStores: any;
  totalCount = 0;
  totalPoints = 0;
  data = [];
  constructor(private af: AngularFireDatabase, public afAuth: AngularFireAuth, private ss: SharedService, private router: Router) {
    if (!this.ss.memberID) {
      this.afAuth.auth.signOut();
      this.router.navigate(['/login']);
    } else {
      this.memberID = this.ss.memberID;
      this.allStores = this.af.list('/stores');
      this.af.list('/u/' + this.ss.emailNode(this.memberID) + '/c').combineLatest(this.allStores)
        .subscribe(p => {
          // console.log(p[0], p[1]);
          p[0].forEach(x => {
            this.totalCount++;
            this.totalPoints = this.totalPoints + x.b;
            x.url = p[1].filter((e) => {
              return e.$key === x.$key;
            })[0].url;
          });
          this.data = p[0];
        });
    }
  }
  sortData(sort: Sort) {
    const d = this.data;
    if (!sort.active || sort.direction === '') {
      this.data = d;
    } else {
      this.data = d.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'b':
          case '$key':
            return compare(+a[sort.active], +b[sort.active], isAsc);
          default: return compare(a[sort.active], b[sort.active], isAsc);
        }
      });
    }
  }
  ngOnInit() {
  }
}
