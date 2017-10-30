import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';
import { SharedService } from './shared.service';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// import { FirebaseAuth, FirebaseAuthState } from 'angularfire2';

import { AngularFireAuth, FirebaseAuthStateObservable } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  subscription: Subscription;
  constructor(private auth: AngularFireAuth, private ss: SharedService, private router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return Observable.from(this.auth.authState)
      .take(1)
      .map(state => !!state)
      .do(authenticated => {
        // console.log('authenticated', authenticated, this.router);
        this.ss.setLoginStatus(authenticated);
        if (!authenticated || !this.ss.employeeO) {
          // console.log('11');
          return false;
        }
        // console.log('22', this.ss.employeeO, authenticated, this.router);
        const u = state.url.replace('/', '');
        if (u === 'store' && !this.ss.employeeO.administrator) {
          this.router.navigate(['/login']);
          return false; //  this.router.navigate(['/login']);
        }
        // console.log('0101', this.ss.employeeO.level, u);
        if (',membership,employee,reports,branch,news,flyers,'.indexOf(',' + u + ',') > -1 && this.ss.employeeO.level !== 10) {
          // console.log('22');
          this.router.navigate(['/login']);
          return false; //  this.router.navigate(['/login']);
        } else {
          // console.log('33');
          return true;
        }

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