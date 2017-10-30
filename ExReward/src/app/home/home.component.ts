import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allNewsFlyers: any = [];
  constructor(public af: AngularFireDatabase) {
    var CurrentDate = new Date();
    CurrentDate.setMonth(CurrentDate.getMonth() - 3);
    const data = [];
    const news = this.af.list('/news', {
      query: {
        orderByKey: true,
        startAt: CurrentDate.valueOf().toString(),
        limitToLast: 100
      }
    });
    // news.take(1).subscribe(p => {
    //   p.forEach(e => {
    //     data.push(e);
    //   });
    // })
    const flyers = this.af.list('/flyers', {
      query: {
        orderByKey: true,
        startAt: CurrentDate.valueOf().toString(),
        limitToLast: 100
      }
    });
    // flyers.take(1).subscribe(p => {
    //   p.forEach(e => {
    //     data.push(e);
    //   });
    // })
    // const all = FirebaseListObservable.merge(news, flyers);
    // all.take(2).subscribe(p => {
    //   p.forEach(e => {
    //     data.push(e);
    //   });

    //   this.sortNewsFlyersByDate(data);
    // })
    this.allNewsFlyers = FirebaseListObservable.combineLatest(news, flyers, (s1, s2) => {
      // console.log(s1,s2);
      return s1.concat(s2).sort((a, b) => {
        return compare(a['$key'], b['$key'], false);
      });
    });
    // .subscribe((p) => {
    //   this.allNewsFlyers =p;
    // })
  }
  sortNewsFlyersByDate(d) {
    this.allNewsFlyers = d.sort((a, b) => {
      return compare(a['$key'], b['$key'], false);
    });
  }
  ngOnInit() {
  }
  getDTString(d) {
    // // console.log('dt',d)
    return new Date(Number(d)).toISOString().slice(0, 19).replace('T', ' ').substring(5, 16);
  }
  read(o) {
    // console.log(o);
  }
}
