import { Component, OnInit, OnDestroy } from '@angular/core';
import { SafeHtml } from '../safehtml';
import { SharedService } from '../shared.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { SocialShareButtonComponent } from '../social-share-button/social-share-button.component';

@Component({
  selector: 'app-newsread',
  templateUrl: './newsread.component.html',
  styleUrls: ['./newsread.component.css']
})
export class NewsreadComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  private sub1: Subscription;
  private sub2: Subscription;
  id: any;
  news: any;
  newsdetail: any;
  likeNum = 0;
  constructor(public snackBar: MdSnackBar,
    private ss: SharedService, public af: AngularFireDatabase, private route: ActivatedRoute) {
   
    if (this.ss.memberID) {
      this.af.object('/u/' + this.ss.emailNode(this.ss.memberID)).update({
        r: Date.now()
      });
    }
  }
  ngOnDestroy() {
    // if (this.sub) { this.sub.unsubscribe() }
    // if (this.sub1) { this.sub1.unsubscribe() }
    // if (this.sub2) { this.sub2.unsubscribe() }
  }
  ngOnInit() {
    // console.log('11', this.ss.memberID);
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      // console.log('id',this.id)
      this.sub1 = this.af.object('/news/' + this.id).subscribe(p => {
        this.news = p;
        this.likeNum = p.likes ? p.likes : 0;
      });

      this.sub2 = this.af.object('/newsdetail/' + this.id).take(1).subscribe(p => {
        this.newsdetail = p;
        // console.log('news', this.news)
        // console.log('newsdetail', this.newsdetail)
      });
      // // console.log('newsdetail',this.newsdetail)
    });
  }
  isHtml(s) {
    if (s && s.indexOf('<') > -1 && s.indexOf('</') > -1) {
      return true;
    } else {
      return false;
    }
  }
  like() {
    if (this.ss.memberID) {
      this.af.object('/u/' + this.ss.emailNode(this.ss.memberID)).take(1).subscribe(p => {
        if (!p.ln || !(p.ln && p.ln.indexOf(this.id.toString()) > -1)) {
          this.af.object('/u/' + this.ss.emailNode(this.ss.memberID)).update({
            ln: (p.ln ? p.ln : '') + this.id.toString()
          });
          this.af.object('/news/' + this.id).update({
            likes: this.likeNum + 1
          });
        }
      });
    }

  }
  openSnackBar() {
    const config = new MdSnackBarConfig();
    config.duration = 6000;
    config.extraClasses = ['snackbar-class'];
    // config.viewContainerRef = this.viewContainerRef;
    this.snackBar.openFromComponent(SocialShareButtonComponent, config);
  }
}