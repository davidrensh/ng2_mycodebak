import { SharedService } from '../shared.service';
import { Component, OnInit, OnDestroy, NgModule, VERSION } from '@angular/core';
import { Sort } from '@angular/material';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AngularFireAuth } from 'angularfire2/auth';
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
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit, OnDestroy {
  items: FirebaseListObservable<any>;
  sub: Subscription;
  data: any;
  locationID = '';
  name = '';
  category = '';
  city = '';
  errmsg = '';
  // defaultText = '';
  // lll = '';
  cats: any;
  constructor(private af: AngularFireDatabase, public afAuth: AngularFireAuth, private ss: SharedService, private router: Router) {
    if (!this.ss.storeSetting) {
      this.afAuth.auth.signOut();
      this.router.navigate(['/login']);
    } else {
      this.loadData();
    }
  }
  loadData() {
    this.city = this.ss.storeSetting.city ? this.ss.storeSetting.city : '';
    this.items = this.af.list('/branches');
    this.sub = this.items.subscribe(s => {
      this.data = s;
    });


    // const app = this.ss.getMainDBApp();
    // if (app === null) {
    //   this.router.navigate(['/login']);
    //   return;
    // }
    // const ref = app.database().ref('/categories');
    // const main = this.af.object(ref);
    // main
    this.af.object('/categories').take(1).subscribe(p => {
      // // console.log(p);
      this.cats = p.all.split(',');
    });

  }
  addRow(e) {
    if (!this.ss.isValidKey(this.locationID)) {
      this.errmsg = 'Invalid branch ID!';
      return;
    }
    // // console.log('addRow', e);
    // // console.log(this.name, this.locationID);
    // if (this.name === '') { // console.log('RETURN'); return; 
    // }
    this.af.object('/branches/' + this.locationID).update({
      name: this.name,
      locationID: this.locationID,
      category: this.category,
      city: this.city
    }).then(_ => {
      // console.log('update!');
      this.name = '';
      this.locationID = '';
      this.category = '';
      this.city = this.ss.storeSetting.city;
      this.loadData();
    }
      );

  }
  onFocus(e) {
    // console.log(e);
    // e.target.childNodes[0].select();
    selectElementContents(e.target.childNodes[0]);
  }
  leave(e, a, name) {
    let newValue = '';
    if (name !== 'category') {
      newValue = e.target.childNodes[0].data;
      if (newValue === '' || newValue === a[name]) { return; }
    }

    switch (name) {
      case 'category':
        newValue = e.value;
        if (newValue === '' || newValue === undefined) { return; }
        this.af.object('/branches/' + a.locationID).update({
          category: newValue
        });
        break;
      case 'locationID':
        this.af.object('/branches/' + newValue).update({
          name: a.name,
          locationID: newValue,
        });
        this.af.object('/branches/' + a.locationID).remove();
        break;
      case 'name':
        this.af.object('/branches/' + a.locationID).update({
          name: newValue
        });
        break;
      case 'city':
        this.af.object('/branches/' + a.locationID).update({
          city: newValue
        });
        break;
      default:
        break;
    }

    // if (name !== 'category') {
    //   newValue = e.target.childNodes[0].data;
    //   // // console.log(newValue, a[name]);
    //   console.log(e, a, name);
    //   if (newValue === '' || newValue === a[name]) { return; }
    //   if (name === 'locationID') {
    //     this.af.object('/branches/' + newValue).update({
    //       name: a.name,
    //       locationID: newValue,
    //     });
    //     this.af.object('/branches/' + a.locationID).remove();
    //   } else {
    //     console.log('22');
    //     this.af.object('/branches/' + a.locationID).update({
    //       name: newValue
    //     });
    //   }
    // } else {
    //   // console.log(e, a, name);
    //   newValue = e.value;
    //   if (newValue === '' || newValue === undefined) { return; }
    //   this.af.object('/branches/' + a.locationID).update({
    //     category: newValue
    //   });
    // }
    // a[name] = newValue;
  }
  delete(o) {
    // console.log('delete', o);
    this.af.object('/branches/' + o.locationID).remove();
    this.data = this.data.filter(function (el) {
      return el.locationID !== o.locationID;
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
      return compare(String(a[sort.active]).toLowerCase(), String(b[sort.active]).toLowerCase(), isAsc);
      // switch (sort.active) {
      //   case 'name': return compare(a.name, b.name, isAsc);
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
