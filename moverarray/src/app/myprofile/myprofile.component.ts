import { Component, OnInit } from '@angular/core';
// import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  memberID = '';
  member: any;
  email = '';
  phone = '';
  anniversary: Date;
  birthday: Date;
  fname = '';
  lname = '';
  errmsg = '';
  constructor(private af: AngularFireDatabase, public afAuth: AngularFireAuth, private ss: SharedService, private router: Router) {
    if (!this.ss.memberID) {
      this.afAuth.auth.signOut();
      this.router.navigate(['/login']);
    } else {
      this.memberID = this.ss.memberID;
      this.af.object('/u/' + this.ss.emailNode(this.memberID)).take(1).subscribe(p => {
        this.member = p;
        this.email = this.ss.toEmail(p.$key);
        this.phone = p.p;
        this.anniversary = p.a;
        this.birthday = p.b;
        this.fname = p.f;
        this.lname = p.l;
      });
    }
  }
  save() {
    if (this.phone !== this.member.p) {
      this.af.object('/p/' + this.ss.phoneNode(this.phone)).take(1).subscribe(p => {
        if (!p.$exists()) {
          this.af.object('/p/' + this.ss.phoneNode(this.phone)).update({
            e: this.email
          });
          this.af.object('/p/' + this.ss.phoneNode(this.member.p)).remove();
        }
        this.af.object('/u/' + this.ss.emailNode(this.memberID)).update({
          p: this.phone
        });
        this.errmsg = 'Saved!';
      });
    }

    this.af.object('/u/' + this.ss.emailNode(this.memberID)).update({
      a: this.anniversary,
      b: this.birthday,
      f: this.fname,
      l: this.lname
    });
    this.af.object('/u/' + this.ss.emailNode(this.memberID)).take(1).subscribe(p => {
      this.ss.setMember(p);
    });
  }
  ngOnInit() {
  }
}
