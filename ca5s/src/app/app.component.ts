import { Component, ViewChild, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';
import { SharedService } from './shared.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';
// import { APP_CONFIG, IAppConfig } from './app.config';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  subscription: Subscription;
  subLevel: Subscription;
  isLoggedin: any;
  employeeLevel = 1;
  locationID = '';
  isAdmin = false;
  status = false;
  employeeO: any;
  sidenav: any;
  menulevel = 0;
  @ViewChild('sidenav') mynav: MatSidenav;
  constructor(public afAuth: AngularFireAuth, private ss: SharedService,
    private router: Router) {
    this.subscription = this.ss.isLoggedin$.subscribe(
      (p) => {
        this.isLoggedin = p;
        this.employeeO = this.ss.employeeO;
        if (this.ss.employeeO) { this.isAdmin = this.ss.employeeO.administrator; }
      }
    );
  }
  logout() {
    // // console.log('loout');
    this.ss.setLoginStatus(false);
    this.ss.logoutMain();
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }
  ngOnInit() {
    // this.sidenav.open();
  }
  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.mynav.open();
    // }, 1000);

  }
  ngOnDestroy() {
    // prevent memory leak when component destroyed
    // this.subscription.unsubscribe();
    this.subLevel.unsubscribe();
    this.ss.OnDestroy();
  }
}
