import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  allNewsFlyers: any = [];
  constructor(public af: AngularFireDatabase) {
    var CurrentDate = new Date();
    CurrentDate.setMonth(CurrentDate.getMonth() - 3);
    this.allNewsFlyers = this.af.list('/news', {
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
    // this.allNewsFlyers =  news.map(p => {
    //   return p.reverse();
    // });
    // .take(1).subscribe(p => {
    //   const data =[];
    //   p.forEach(e => {
    //     data.push(e);
    //   });
    //   this.sortNewsFlyersByDate(data);
    // });
  }
  // sortNewsFlyersByDate(d) {
  //   this.allNewsFlyers = d.sort((a, b) => {
  //     return compare(a['$key'], b['$key'], false);
  //   });
  // }
  ngOnInit() {
  }
  getDTString(d) {
    // // console.log('dt',d)
    return new Date(Number(d)).toISOString().slice(0, 19).replace('T', ' ').substring(5, 16);
  }
}
