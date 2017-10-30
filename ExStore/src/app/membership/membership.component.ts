import { SharedService } from '../shared.service';
import { Component, OnInit, OnDestroy, NgModule, VERSION } from '@angular/core';
import { Sort } from '@angular/material';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
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
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css']
})
export class MembershipComponent implements OnInit, OnDestroy {
  name = '';
  errmsg = '';
  private sub: Subscription;
  dpoints = 0;
  regFee = 0;
  renewFee = 0;
  lifetime = false;
  items: FirebaseListObservable<any>;
  data: any;
  constructor(private af: AngularFireDatabase, private ss: SharedService, private router: Router) {
    this.loadData();
  }
  loadData() {
    this.items = this.af.list('/membership');
    this.sub = this.items.subscribe(s => {
      this.data = s;
    });
  }
  addRow(e) {
    if (!this.ss.isValidKey(this.name)) {
      this.errmsg = 'Invalid name!';
      return;
    }
    // // console.log('addRow', e);
    // // console.log(this.name, this.locationID);
    // if (this.name === '') { // console.log('RETURN'); return; }
    this.af.object('/membership/' + this.name + '/').update({
      name: this.name,
      dpoints: this.dpoints,
      regFee: this.regFee,
      renewFee: this.renewFee,
      lifetime: this.lifetime

    }).then(_ => {
      // console.log('update!');
      this.name = '';
      this.dpoints = 0;
      this.regFee = 0;
      this.renewFee = 0;
      this.lifetime = false;
      this.loadData();
    }
      );

  }
  onFocus(e) {
    // console.log(e);
    // e.target.childNodes[0].select();
    selectElementContents(e.target.childNodes[0]);
  }
  leave(e, a, key) {
    let newValue = '';
    if (key !== 'lifetime') {
      newValue = e.target.childNodes[0].data;
      // // console.log(newValue, a[key]);
      // // console.log(e, a, key);
      if (newValue === '' || newValue === a[key]) { return; }
      if (key === 'name') {
        this.af.object('/membership/' + newValue).update({
          name: newValue,
        });
        this.af.object('/membership/' + a.name).remove();
      } else {
        this.af.object('/membership/' + a.name).update({
          [key]: newValue
        });
      }
    } else {
      // console.log(e, a, key);
      newValue = e.checked;
      if (newValue === '') { return; }
      this.af.object('/membership/' + a.name).update({
        lifetime: newValue
      });
    }
  }
  delete(o) {
    // console.log('delete', o);
    this.af.object('/membership/' + o.name).remove();
    this.data = this.data.filter(function (el) {
      return el.name !== o.name;
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
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        default: return compare(+a[sort.active], +b[sort.active], isAsc);
      }
    });
  }
  ngOnInit() {
  }
  ngOnDestroy() {
    if (this.sub) { this.sub.unsubscribe(); }
  }
}
