import { SharedService } from '../shared.service';
import { Component, OnInit, OnDestroy, NgModule, VERSION } from '@angular/core';
import { Sort } from '@angular/material';
import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Subscription } from 'rxjs/Subscription';
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  password = '';
  errmsg = '';
  constructor(private af: AngularFireDatabase, public afAuth: AngularFireAuth, private ss: SharedService, private router: Router) {
  }
  save() {
    this.afAuth.auth.currentUser.updatePassword(this.password);
    const app = this.ss.getMainDBApp(); //  firebase.initializeApp(config);
    if (app === null) {
      this.router.navigate(['/login']);
      return;
    }
    app.auth().currentUser.updatePassword(this.password);
    this.errmsg = 'Password changed!';
  }
  ngOnInit() {
  }

}
