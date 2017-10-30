import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
@Component({
  selector: 'app-flyers',
  templateUrl: './flyers.component.html',
  styleUrls: ['./flyers.component.css']
})
export class FlyersComponent implements OnInit {
  allNewsFlyers: any = [];
  constructor(public af: AngularFireDatabase) {
    var CurrentDate = new Date();
    CurrentDate.setMonth(CurrentDate.getMonth() - 3);
    this.allNewsFlyers = this.af.list('/flyers', {
      query: {
        orderByKey: true,
        startAt: CurrentDate.valueOf().toString(),
        limitToLast: 100
      }
    }).map(p => {
      return p.sort((a, b) => {
        return compare(a['$key'], b['$key'], false);
      });
    });
    //   this.allNewsFlyers = f.take(1).map(p => {
    //     return p.reverse();
    //     // console.log('p', p);
    //     // return p.sort((a, b) => {
    //     //   return compare(a['$key'], b['$key'], false);
    //     // });
    //     // const data = [];
    //     // p.forEach(e => {
    //     //   data.push(e);
    //     // });
    //     // this.sortNewsFlyersByDate(data);
    //   })
    // }
    // sortNewsFlyersByDate(d) {
    //   this.allNewsFlyers = d.sort((a, b) => {
    //     return compare(a['$key'], b['$key'], false);
    //   });
  }
  ngOnInit() {
  }
  getDTString(d) {
    // // console.log('dt',d)
    return new Date(Number(d)).toISOString().slice(0, 19).replace('T', ' ').substring(5, 16);
  }
}
