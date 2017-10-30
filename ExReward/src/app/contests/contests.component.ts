import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { SharedService } from '../shared.service';

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
@Component({
  selector: 'app-contests',
  templateUrl: './contests.component.html',
  styleUrls: ['./contests.component.css']
})
export class ContestsComponent implements OnInit {
  allcontests: any = [];
  constructor(public af: AngularFireDatabase, private ss: SharedService) {
    const CurrentDate = new Date();
    CurrentDate.setMonth(CurrentDate.getMonth() - 3);
    const data = [];
    const contests = this.af.list('/contests', {
      query: {
        orderByKey: true,
        startAt: CurrentDate.valueOf().toString(),
        limitToLast: 100
      }
    });

    const coupons = this.af.list('/coupons', {
      query: {
        orderByKey: true,
        startAt: CurrentDate.valueOf().toString(),
        limitToLast: 100
      }
    });

    this.allcontests = FirebaseListObservable.combineLatest(contests, coupons, (s1, s2) => {
      if (this.ss.member === undefined) {
        return s1.concat(s2).sort((a, b) => {
          return compare(a['$key'], b['$key'], false);
        });
      } else {
        const s10 = s1.filter(q => {
          const res = this.categoryChecked(this.ss.categories, q.category);
          // console.log(this.ss.member.ct);
          return (q.city ? q.city.toString().toLowerCase() : '') ===
            (this.ss.member.ct ? this.ss.member.ct.toString().toLowerCase() : '') && res;
        });
        const s20 = s2.filter(q => {
          const res = this.categoryChecked(this.ss.categories, q.category);
          return (q.city ? q.city.toString().toLowerCase() : '') ===
            (this.ss.member.ct ? this.ss.member.ct.toString().toLowerCase() : '') && res;
        });
        return s10.concat(s20).sort((a, b) => {
          return compare(a['$key'], b['$key'], false);
        });
      }
    });
  }
  categoryChecked(cats, cat) {
    if (cats === undefined) { return true; }
    // console.log('cats', cats, cat);
    let res = false;
    cats.forEach(e => {
      if (e.$key ? e.$key.toString().toLowerCase() : '' === cat ? cat.toString().toLowerCase() : '' && e.s) {
        res = true;
      }
    });
    return res;
  }
  sortNewsFlyersByDate(d) {
    this.allcontests = d.sort((a, b) => {
      return compare(a['$key'], b['$key'], false);
    });
  }
  ngOnInit() {
  }
  getDTString(d) {
    return new Date(Number(d)).toISOString().slice(0, 19).replace('T', ' ').substring(5, 16);
  }
}
