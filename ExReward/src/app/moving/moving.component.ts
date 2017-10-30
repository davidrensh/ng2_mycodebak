import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
// import { ReCAPTCHA } from './recaptcha';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-moving',
  templateUrl: './moving.component.html',
  styleUrls: ['./moving.component.css']
})
export class MovingComponent implements OnInit, OnDestroy {
  isRegister = false;
  subscription: Subscription;
  isLoggedin = false;
  phoneemail = '';
  email = '';
  phone = '';
  password = '';
  errmsg = '';
  autVer: any;
  confirmationResult: any;
  constructor(private af: AngularFireDatabase, public afAuth: AngularFireAuth, private ss: SharedService,
    private router: Router) {
    this.ss.setLoginStatus(false);
  }

  ngOnInit() {
  }
  isEmail(): boolean {
    return this.phoneemail.indexOf('@') > 1;
  }
  validEmail(s) {
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (pattern.test(s)) {
      return true;
    } else {
      return false;
    }
  }
  validPhone(s) {
    const PHONE_REGEXP = /^[(]{0,1}[0-9]{3}[)\.\- ]{0,1}[0-9]{3}[\.\- ]{0,1}[0-9]{4}$/;
    if (PHONE_REGEXP.test(s)) {
      return true;
    } else {
      return false;
    }
  }
  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
  afterLogin() {
    this.ss.setLoginStatus(true);
    if (this.isEmail()) {
      // this.ss.setMember(this.phoneemail);
    } else {

      this.af.object('/p/' + + this.ss.phoneNode(this.phoneemail)).take(1).subscribe(s => {
      });
    }
  }
  failedLogin() {
    this.ss.setLoginStatus(false);
    // this.router.navigate(['/login']);
  }
  realLogin() {
    // // console.log('real');
    this.afAuth.auth.signInWithEmailAndPassword(this.phoneemail, this.password).then((authData) => {
      this.afterLogin();
    }).catch((error) => {
      // console.log('Failed login:', error);
      this.errmsg = error.toString();
      this.failedLogin();
    });

  }
  login() {

    if (this.isEmail()) {
      this.realLogin();
    } else {
      this.af.object('/p/' + this.ss.phoneNode(this.phoneemail)).take(1).subscribe((o) => {
        if (o.$exists()) {
          if (this.validPhone(this.phoneemail)) {
            this.errmsg = '';
            // this.sendPhoneCode();
          } else {
            this.errmsg = 'Invalid phone number.';
          }
        } else {
          this.errmsg = 'Phone is not exist.';
        }
      });
    }
  }
}
