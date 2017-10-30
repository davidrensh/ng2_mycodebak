import { SharedService } from '../shared.service';
import { Component, OnInit, NgModule, VERSION } from '@angular/core';
import { Sort } from '@angular/material';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router } from '@angular/router';
import * as g from '../global';
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  totalCount = 0;
  total$ = 0;
  length = 0;
  pageSize = 10;
  rptTypes = [
    { value: '0', viewValue: 'Employee' },
    { value: '1', viewValue: 'Location' },
    { value: '2', viewValue: 'Transaction' }
  ];
  transTypes = g.transTypes;
  rptSubTypes = [];
  rptType: any = null;
  rptSubType: any = null;
  rptYear: any = null;
  rptYears = [];
  // rptMonths = [];
  yearsToShow = 3;
  rptMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  rptMonth: any = null;
  data: any;
  dataAll: any;
  currentPage: any = null;
  constructor(private af: AngularFireDatabase, private ss: SharedService, private router: Router) {
    for (let i = 0; i < this.yearsToShow; i++) {
      this.rptYears.push(this.getYear(i));
    }
  }
  toEmail(s) {
    return this.ss.toEmail(s);
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
  showYearRpt() {
    // console.log('this.rptYear', this.rptYear);
    const d = new Date(this.rptYear + '-01-01T00:00:01');
    const nextYear = this.rptYear + 1;
    const dEnd = new Date(nextYear + '-01-01T00:00:01');
    // console.log(dEnd);
    // console.log('yeard', d, d.valueOf().toString());
    const dataO = this.af.list('/d', {
      query: {
        orderByKey: true,
        startAt: d.valueOf().toString(),
        endAt: dEnd.valueOf().toString()
      }
    });
    dataO.take(1).subscribe(p => {
      // this.dataAll = p;
      this.dataAll = this.filterData(p);
      this.length = this.dataAll.length;
      this.totalCount = this.dataAll.length;
      this.total$ = this.dataAll.reduce(function (cnt, o) { return cnt + (o.i ? Number(o.i) : 0); }, 0);
      this.toPage();
      // console.log('01', this.dataAll);
    });
    // console.log('00', this.data);
  }
  filterData(d) {
    // console.log('rptSubType', this.rptSubType);
    switch (this.rptType.viewValue) {
      case 'Employee':
        return d.filter((e) => {
          return e.n === this.rptSubType;
        });
      case 'Location':
        return d.filter((e) => {
          return e.l === this.rptSubType;
        });
      case 'Transaction':
        return d.filter((e) => {
          // console.log('tt', e.t, this.rptSubType, e);
          return e.t === this.rptSubType;
        });
      default:
        return d;
    }
  }
  getDTString(d) {
    return new Date(Number(d)).toISOString().slice(0, 16).replace('T', ' ');
  }
  showMonthRpt() {
    const mNum = this.rptMonths.indexOf(this.rptMonth) + 1;
    const v0 = this.rptYear + '-' + ('00' + mNum).slice(-2) + '-01T00:00:01';
    const d = new Date(v0);
    const nextMonth = mNum + 1;
    const v1 = this.rptYear + '-' + ('00' + nextMonth).slice(-2) + '-01T00:00:01';
    const dEnd = new Date(v1);
    // console.log(v0, v1, mNum, nextMonth);
    // console.log(dEnd);
    // console.log('yeard', d, d.valueOf().toString());
    const dataO = this.af.list('/d', {
      query: {
        orderByKey: true,
        startAt: d.valueOf().toString(),
        endAt: dEnd.valueOf().toString()
      }
    });
    dataO.take(1).subscribe(p => {
      // this.dataAll = p;
      this.dataAll = this.filterData(p);
      this.length = this.dataAll.length;
      this.totalCount = this.dataAll.length;
      this.total$ = this.dataAll.reduce(function (cnt, o) { return cnt + (o.i ? Number(o.i) : 0); }, 0);
      this.toPage();
      // console.log('01', this.dataAll);
    });
  }
  changeSubType() {
    this.rptYear = null;
    this.rptMonth = null;
    this.dataAll = null;
    this.data = null;
    this.totalCount = 0;
    this.total$ = 0;
  }
  getRptSubType(o) {
    this.rptSubTypes = [];
    this.rptSubType = null;
    this.rptYear = null;
    this.rptMonth = null;
    switch (o.viewValue) {
      case 'Employee':
        const es = this.af.list('/employees');
        const sube = es.take(1).subscribe(s => {
          s.filter((e) => {
            return !e.administrator;
          }).forEach(e => {
            this.rptSubTypes.push({ value: e.id, viewValue: e.id });
          });
        });
        break;
      case 'Location':
        const items = this.af.list('/branches');
        const sub = items.take(1).subscribe(s => {
          s.forEach(e => {
            this.rptSubTypes.push({ value: e.locationID, viewValue: e.name });
          });
        });
        break;
      case 'Transaction':
        this.rptSubTypes = this.transTypes;
        break;
      default:
        break;
    }
  }
  ngOnInit() {
  }
  getYear(i) {
    switch (i) {
      case 0:
        return new Date().getFullYear();
      case 1:
        const s = new Date().setFullYear(new Date().getFullYear() - 1);
        return new Date(s).getFullYear();
      case 2:
        const s2 = new Date().setFullYear(new Date().getFullYear() - 2);
        return new Date(s2).getFullYear();
      default:
        break;
    }
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
