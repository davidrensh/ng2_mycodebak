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
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [AngularFireAuth],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isRegister = false;
  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  // isLoggedin = false;
  phoneemail = '';
  email = '';
  phone = '';
  password = '';
  errmsg = '';
  autVer: any;
  confirmationResult: any;
  constructor(private af: AngularFireDatabase, public afAuth: AngularFireAuth, private ss: SharedService,
    private router: Router) {
    // some case, i.e. auto logout by firebase, 
    // then we need change system state to show lock unlock button on toolbar at top right corner
    this.ss.setLoginStatus(false); // this.afAuth.auth.currentUser); 
  }

  afterLogin() {
    this.ss.setLoginStatus(true);
    this.sub1 = this.af.object('/employees/' + this.ss.emailNode(this.phoneemail)).take(1).subscribe((o) => {
      if (o.$exists() && !o.deleted) {
        this.ss.setEmployee(o); // locationID employeeLevel
        this.router.navigate(['/biz']);
      } else {
        this.errmsg = 'User is not exist in record.';
        this.afAuth.auth.signOut();
        this.ss.setLoginStatus(false);
        this.router.navigate(['/login']);
      }
    });
    this.sub3 = this.af.object('/c').subscribe((o) => {
      this.ss.setStore(o);
    });
  }
  failedLogin() {
    this.ss.setLoginStatus(false);
    // this.router.navigate(['/login']);
  }
  isEmail(): boolean {
    return this.ss.isEmail(this.phoneemail);
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
  login() {
    if (this.isEmail()) {
      this.realLogin();
    } else {
      this.sub2 = this.af.object('/p/' + this.ss.phoneNode(this.phoneemail)).subscribe((o) => {
        if (o.$exists()) {
          if (this.validPhone(this.phoneemail)) {
            this.errmsg = '';
            this.sendPhoneCode();
          } else {
            this.errmsg = 'Invalid phone number.';
          }
        } else {
          this.errmsg = 'Phone is not exist.';
        }
      });

    }
  }
  verify() {
    this.confirmationResult.confirm(this.password).then((result) => {
      // User signed in successfully.
      const user = result.user;
      // console.log(user.phoneNumber);

      this.afterLogin();
    }).catch(function (error) {
      this.errmsg = `User couldn't sign in (bad verification code?)`;
      this.failedLogin();
      // ...
    });
  }
  sendPhoneCode() {
    // this.sendPhoneCode2();
    // console.log('re1');
    var container = document.getElementById('recaptcha-container')
    container.innerHTML = '';
    this.autVer = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // // console.log('re2', response);
        // this.sendPhoneCode2();
        // this.confirmationResult = response;
      }
    });
    // setTimeout(() => {
    this.sendPhoneCode2();
    // }, 1000);
  }
  addCountryCode(s) {
    if (s.indexOf('+') < 0) {
      return '+1' + s;
    } else { return s }
  }
  sendPhoneCode2() {
    this.afAuth.auth.signInWithPhoneNumber(this.addCountryCode(this.phoneemail), this.autVer)
      .then((r) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        // // console.log('re23', !this.confirmationResult, this.isEmail(), !this.isRegister);
        this.confirmationResult = r;
      }).catch((error) => {
        this.errmsg = 'SMS not sent. ' + error.toString();
        // // console.log('re24', error);
        this.confirmationResult = null;
        // var container = document.getElementById('recaptcha-container')
        // container.innerHTML = '';
        window.location.reload();
      });
  }
  realLogin() {
    // // console.log('real');
    this.afAuth.auth.signInWithEmailAndPassword(this.phoneemail, this.password).then((authData) => {
      this.ss.signInMainDB(this.af, authData, this.phoneemail, this.password);
      this.afterLogin();
    }).catch((error) => {
      // console.log('Failed login:', error);
      this.errmsg = error.toString();
      this.failedLogin();
    });

  }
  forget() {
    if (this.validEmail(this.phoneemail)) {
      this.afAuth.auth.sendPasswordResetEmail(this.phoneemail).then(() => {
        this.errmsg = 'Email sent.';
      }).catch(function (error) {
        // An error happened.
      });
    } else {
      this.errmsg = 'Please enter valid email.';
    }
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    // we cannot unsubscribe, otherwise it will keep on login form
    // if (this.sub1) { this.sub1.unsubscribe(); }
    // if (this.sub2) { this.sub2.unsubscribe(); }
    // if (this.sub3) { this.sub3.unsubscribe(); }
  }
}
