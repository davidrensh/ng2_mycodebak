import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class SharedService {
  public isLoggedin = new Subject<any>();
  public isLoggedin$ = this.isLoggedin.asObservable();
  public newsNum = new Subject<any>();
  public newsNum$ = this.newsNum.asObservable();
  public flyersNum = new Subject<any>();
  public flyersNum$ = this.flyersNum.asObservable();
  member: any;
  memberID = '';
  // memberName = '';
  memberStores: any;
  constructor() {
    // this.setLoginStatus(false);
  }
  setLoginStatus(p: any) {
    // console.log('set', p);
    this.isLoggedin.next(p);
  }
  setNewsNum(p: any) {
    this.newsNum.next(p);
  }
  setFlyersNum(p: any) {
    this.flyersNum.next(p);
  }
  toEmail(s) {
    return s.toLowerCase().replace(/,/g, '.');
  }
  setMember(s) {
    this.member = s;
    this.memberID = this.toEmail(s.$key);
    this.setLoginStatus(true);
    // console.log('shared', this.memberID, s);
  }
  emailNode(s) {
    return s.toLowerCase().replace(/\./g, ',');
  }
  phoneNode(s) {
    return s.replace(/\./g, '').replace(/\-/g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/\ /g, '').replace('+1', '');
  }
  isEmail(s): boolean {
    return s.indexOf('@') > 1;
  }
}
export function SharedServiceLoader() { return new SharedService(); }