import { Component, ViewEncapsulation, OnInit} from '@angular/core';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { WeldentryComponent } from './+weldentry';
import { NdebatchComponent } from './+ndebatch';
import { Ab83batchComponent } from './+ab83batch';
import { ImportComponent } from './+import';
import { ExportComponent } from './+export';
import { TransferwelddataComponent } from './+transferwelddata';
import { ProjectComponent } from './+project';
import { ChildweldtypeComponent } from './+childweldtype';
import { InterchangeableprocessComponent } from './+interchangeableprocess';

import { PipeheatComponent } from './+pipeheat';
import { ScheduleComponent } from './+schedule';
import { SchedulewallthicknessComponent } from './+schedulewallthickness';
import { LineclassComponent } from './+lineclass';
import { SevicetypeComponent } from './+sevicetype';
import { WeldersymbolComponent } from './+weldersymbol';
import { WelderentryComponent } from './+welderentry';
import { WelderqualificationComponent } from './+welderqualification';
import { WeldprocedureComponent } from './+weldprocedure';
import { UsersetupComponent } from './+usersetup';
import { MyprofileComponent } from './+myprofile';
import { AboutComponent } from './+about';
import { HomeComponent } from './+home';
import { SignupComponent } from './+signup';
import { ServicetypeComponent } from './+servicetype';
import { ParameterComponent } from './+parameter';
import { ParametertypeComponent } from './+parametertype';

import { ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router,Routes} from '@angular/router';
import { RoleService } from './role.service';
import { HTTP_PROVIDERS } from '@angular/http';
//import {MD_TABS_DIRECTIVES} from '@angular2-material/tabs/tabs';
import {MdIcon, MdIconRegistry } from '@angular2-material/icon/icon';
import {MdButton, MdAnchor} from '@angular2-material/button/button';
import {MD_SIDENAV_DIRECTIVES, MdSidenav} from '@angular2-material/sidenav/sidenav';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input/input';
import {MdCard} from '@angular2-material/card/card';
import {MdCheckbox} from '@angular2-material/checkbox/checkbox';

import {AngularFire, FirebaseAuth, FirebaseListObservable} from 'angularfire2';
let max = 5;
@Component({
  selector: 'welderlog-app',
  templateUrl: 'app/welderlog.component.html',
  styleUrls: ['app/welderlog.component.css'],
  directives: [MdCard, MdCheckbox, ROUTER_DIRECTIVES, MD_SIDENAV_DIRECTIVES, MdButton, MdAnchor, MdIcon, MD_INPUT_DIRECTIVES],
  providers: [ROUTER_PROVIDERS, MdIconRegistry, HTTP_PROVIDERS],
  encapsulation: ViewEncapsulation.None,
})
@Routes([

  { path: '/weldentry', component: WeldentryComponent },
  { path: '/ndebatch', component: NdebatchComponent },
  { path: '/ab83batch', component: Ab83batchComponent },
  { path: '/import', component: ImportComponent },
  { path: '/export', component: ExportComponent },
  { path: '/transferwelddata', component: TransferwelddataComponent },
  { path: '/project', component: ProjectComponent },
  { path: '/childweldtype', component: ChildweldtypeComponent },
  { path: '/interchangeableprocess', component: InterchangeableprocessComponent },
  { path: '/pipeheat', component: PipeheatComponent },
  { path: '/schedule', component: ScheduleComponent },
  { path: '/schedulewallthickness', component: SchedulewallthicknessComponent },
  { path: '/lineclass', component: LineclassComponent },
  { path: '/weldersymbol', component: WeldersymbolComponent },
  { path: '/welderentry', component: WelderentryComponent },
  { path: '/welderqualification', component: WelderqualificationComponent },
  { path: '/weldprocedure', component: WeldprocedureComponent },
  { path: '/usersetup', component: UsersetupComponent },
  { path: '/myprofile', component: MyprofileComponent },
  { path: '/about', component: AboutComponent },
  { path: '/home', component: HomeComponent },
  { path: '/signup', component: SignupComponent },
  { path: '', component: HomeComponent },
  { path: '/', component: HomeComponent },
  {path: '/servicetype', component: ServicetypeComponent},
  {path: '/parameter', component: ParameterComponent},
  {path: '/parametertype', component: ParametertypeComponent}
])
export class WelderlogAppComponent implements OnInit {
  isHome: boolean = false;
  isReports: boolean = false;
  isTools: boolean = false;
  isSettings: boolean = false;
  isMore: boolean = false;

  isLogin: boolean = false;
  dividerColor: boolean;
  requiredField: boolean;
  floatingLabel: boolean;
  name: string;

  currentBar: string = "";
  selectedMenu: string = "";
  menuMain: FirebaseListObservable<any[]>;
  menuSub: FirebaseListObservable<any[]>;
  constructor(public router: Router, public rs: RoleService, public auth0: FirebaseAuth, public af: AngularFire) {
    //console.log("main:" + location.pathname);
    // if (location.pathname === "/admin")
    //     this.router.navigateByUrl('/admin/AdminLogin');
    // else if (location.pathname === "/home") this.router.navigateByUrl('/home/Login');
    // this.router.navigateByUrl('/home/Login');
    this.menuMain = this.af.list("/menu");
    //console.log("this.menuMain" + this.menuMain);
  }
  ngOnInit() {

  }
  setSub(s: string) {
    if (this.currentBar !== s) {
      this.currentBar = s;
      this.menuSub = null;
      //   console.log("this.getSub" + m);
      //console.log("this.getSublist" + JSON.stringify(this.af.list("/menu/" + m)));
      this.menuSub = this.af.list("/menu/" + this.currentBar);
    } else {
      this.currentBar = "";
      this.menuSub = null;
    }
  }
  getLink(s: string): any {
    return s.replace(" ", "");
  }
  // nav(s: string) {
  //   s = s.replace(" ", "");
  //   let s1 = this.routeTree.root.urlSegments[0].toString() + '/' + s;
  //   console.log(s1);
  //   this.router.navigateByUrl(s1);
  // }
}
