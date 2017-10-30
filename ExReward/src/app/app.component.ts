import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';
import { SharedService } from './shared.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  mShow = false;
  isLoggedin = false;
  flyersNewCount = 0;
  newsNewCount = 0;
  membername = '';
  constructor(public af: AngularFireDatabase, public afAuth: AngularFireAuth, private ss: SharedService,
    private router: Router) {
    this.ss.setLoginStatus(!!this.afAuth.auth.currentUser);
    this.subscription = this.ss.isLoggedin$.subscribe(
      (p) => {
        this.isLoggedin = p;
        if (p && this.ss.member) {
          const s = this.ss.member.$key;
          // console.log('aa', s, s.indexOf('@'), s.substring(0, s.indexOf('@')));
          this.membername = (!!this.ss.member.f) ? (this.ss.member.f + ' ' + this.ss.member.l) : s.substring(0, s.indexOf('@'));
        }
      }
    );
    this.ss.newsNum$.subscribe(p => {
      this.newsNewCount = p + this.flyersNewCount;
    });
    this.ss.flyersNum$.subscribe(p => {
      this.flyersNewCount = p;
      this.newsNewCount = p + this.newsNewCount;
    });
  }
  logout() {
    // // console.log('loout');
    this.ss.setLoginStatus(false);
    this.afAuth.auth.signOut();
    this.router.navigate(['/home']);
  }
  ngOnInit() {

    // this.subscription = this.ss.isLoggedin$.subscribe(
    //   (p) => {
    //     // // console.log('app', p);
    //     this.isLoggedin = p;
    //   }
    // );
  }
  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();

  }
}
