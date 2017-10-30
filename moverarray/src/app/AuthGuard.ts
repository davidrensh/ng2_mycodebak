import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';
import { SharedService } from './shared.service';
import { Router } from '@angular/router';
// import { FirebaseAuth, FirebaseAuthState } from 'angularfire2';

import { AngularFireAuth, FirebaseAuthStateObservable } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  subscription: Subscription;
  constructor(private auth: AngularFireAuth, private ss: SharedService, private router: Router) {
  }
  canActivate(): Observable<boolean> {
    return Observable.from(this.auth.authState)
      .take(1)
      .map(state => !!state)
      .do(authenticated => {
        this.ss.setLoginStatus(authenticated);
        return !!authenticated;
      });
  }
  //  {
  // return this.auth.authState
  // .do(authenticated => {
  //   if (!authenticated) {
  //     this.router.navigate(['/login']);
  //   }
  // });
  // if (!this.auth.authState) { this.router.navigate(['/login']); };
  // return this.auth.authState;

  canActivateChild() {
    // console.log('checking child route access');
    return true;
  }

}