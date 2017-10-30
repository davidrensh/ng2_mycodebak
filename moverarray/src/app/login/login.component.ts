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
  subscription: Subscription;
  isLoggedin = false;
  phoneemail = '';
  email = '';
  phone = '';
  password = '';
  errmsg = '';
  autVer: any;
  confirmationResult: any;
  isEmployee = false;
  constructor(private af: AngularFireDatabase, public afAuth: AngularFireAuth, private ss: SharedService,
    private router: Router) {
    this.ss.setLoginStatus(false);
  }
  addUser(s) {
    this.af.object('/u/' + this.ss.emailNode(s)).update({
      email: s,
      phone: this.phone,
      // password: this.password,
    });
    this.af.object('/p/' + + this.ss.phoneNode(this.phone)).update({
      email: s,
    });
  }
  loadNumByLastReadDate(r) {
    // console.log('r', r);
    const news = this.af.list('/news', {
      query: {
        orderByKey: true,
        startAt: r ? r.valueOf().toString() : ''
      }
    });
    news.take(1).subscribe(p => {
      this.ss.setNewsNum(p.length);
    })
    const flyers = this.af.list('/flyers', {
      query: {
        orderByKey: true,
        startAt: r ? r.valueOf().toString() : ''
      }
    });
    flyers.take(1).subscribe(p => {
      this.ss.setFlyersNum(p.length);
    })
  }
  loadNewsFlyersNum(email) {
    this.af.object('/u/' + this.ss.emailNode(email)).subscribe(p => {
      this.loadNumByLastReadDate(p.r);
    });

  }
  loadLoginAndGoToHist(e){
    this.af.object('/u/' + this.ss.emailNode(e)).take(1).subscribe(p => {
      this.ss.setMember(p);
      this.router.navigate(['/myhist']);
      this.loadNewsFlyersNum(e);
    });
  }
  afterLogin() {
    this.ss.setLoginStatus(true);
    if (this.isEmail()) {
      // this.ss.setMember(this.phoneemail);
      this.loadLoginAndGoToHist(this.phoneemail);
    } else {
     
      this.af.object('/p/' + + this.ss.phoneNode(this.phoneemail)).take(1).subscribe(s => {
        this.loadLoginAndGoToHist(s.e);
      });
    }
  }
  failedLogin() {
    this.ss.setLoginStatus(false);
    // this.router.navigate(['/login']);
  }
  register() {
    if (!this.validEmail(this.email)) {
      this.errmsg = 'Invalid email.';
      return;
    }
    if (!this.validPhone(this.phone)) {
      this.errmsg = 'Invalid phone.';
      return;
    }

    this.af.object('/p/' + + this.ss.phoneNode(this.phone)).take(1).subscribe((o) => {
      if (o.$exists()) {
        this.errmsg = 'Phone exist.';
      } else {
        this.createUser();
      }
    });

    // // console.log(this.email, this.password);

  }
  createUser() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password).then(
      (authdata) => {
        this.addUser(this.email);
        // authdata.sendEmailVerification();
        this.afterLogin();
        this.errmsg = '';
      }).catch((error) => {
        this.errmsg = error.toString();
        // console.log('Error creating user:', error);
        this.failedLogin();
      });
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
  login() {
    if (this.isRegister) {
      this.register();
    } else {
      if (this.isEmail()) {
        this.realLogin();
      } else {
        this.af.object('/p/' + this.ss.phoneNode(this.phoneemail)).take(1).subscribe((o) => {
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
        // console.log('re2', response);
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
        // console.log('re23', !this.confirmationResult, this.isEmail(), !this.isRegister);
        this.confirmationResult = r;
      }).catch((error) => {
        this.errmsg = 'SMS not sent. ' + error.toString();
        // console.log('re24', error);
        this.confirmationResult = null;
        // var container = document.getElementById('recaptcha-container')
        // container.innerHTML = '';
        window.location.reload();
      });
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
  forget() {
    if (this.validEmail(this.phoneemail)) {
      this.afAuth.auth.sendPasswordResetEmail(this.phoneemail).then(() => {
        this.errmsg = 'Email sent.';
      }).catch(function (error) {
        // An error happened.
      });
    } else {
      this.errmsg = 'Please enter your email.';
    }
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
