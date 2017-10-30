import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import * as firebase from 'firebase/app';
@Injectable()
export class SharedService {
  public isLoggedin = new Subject<any>();
  public isLoggedin$ = this.isLoggedin.asObservable();
  public employee = new Subject<any>();
  public employee$ = this.employee.asObservable();
  public store = new Subject<any>();
  public store$ = this.store.asObservable();

  subscription: Subscription;
  subLevel: Subscription;
  subMainDB: Subscription;
  loggedin = false;
  employeeO: any;
  locationID = '';
  app: any = null;
  storeSetting: any;
  // memberships: any;
  constructor() {

    this.subscription = this.isLoggedin$.subscribe(
      (p) => {
        this.loggedin = p;
      }
    );
    this.subLevel = this.employee$.subscribe(
      (p) => {
        this.employeeO = p;
      }
    );
  }
  OnDestroy() {
    if (this.subscription) { this.subscription.unsubscribe(); }
    if (this.subLevel) { this.subLevel.unsubscribe(); }
    if (this.subMainDB) { this.subMainDB.unsubscribe(); }
  }
  setLoginStatus(p: any) {
    this.isLoggedin.next(p);
  }
  setEmployee(p: any) {
    // console.log('setEmployee=', p);
    this.employee.next(p);
  }
  setStore(p: any) {
    this.store.next(p);
  }
  emailNode(s) {
    return s.toLowerCase().replace(/\./g, ',');
  }
  toEmail(s) {
    return s.toLowerCase().replace(/,/g, '.');
  }
  phoneNode(s) {
    return s.replace(/\./g, '').replace(/\-/g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/\ /g, '').replace('+1', '');
  }
  isEmail(s): boolean {
    return s.indexOf('@') > 1;
  }
  logoutMain() {
    if (this.app === null) { return; }
    this.app.auth().signOut();
    this.app.delete();
    this.app = null;
  }
  isValidKey(text) {
    return typeof text === 'string' &&
      text.length && text.trim().length &&
      !text.match(/[.$\[\]#\/]/);
  }
  signInMainDB(af, result, email, pass) {
    if (this.subMainDB) {
      this.subMainDB.unsubscribe();
      if (this.app) { this.app.auth().signOut() }
    }
    this.subMainDB = af.object('/c').valueChanges().subscribe((cf) => {
      const config = {
        apiKey: cf.mainapiKey,
        authDomain: cf.mainauthDomain,
        databaseURL: cf.maindatabaseURL,
        storageBucket: cf.mainstorageBucket
      };
      this.storeSetting = cf;
      let a = firebase.apps.filter((e) => {
        return e.name === 'maindb';
      });
      if (a.length < 1) {
        this.app = firebase.initializeApp(config, 'maindb');
      }
      const cred = firebase.auth.EmailAuthProvider.credential(email, pass);
      this.app.auth().signInWithCredential(cred);
    });
  }
  getMainDBApp() {
    // if (this.app !== null) { return this.app; }
    // this.app = firebase.initializeApp(config, 'maindb');
    return this.app;
  }
}
export function SharedServiceLoader() { return new SharedService(); }