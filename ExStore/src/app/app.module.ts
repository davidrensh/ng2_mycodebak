import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { MaterialModule, MdNativeDateModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CdkTableModule } from '@angular/cdk';
import { AppComponent } from './app.component';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { NewsComponent } from './news/news.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';

import { AppRoutingModule } from './app-routing.module';
import { SharedService, SharedServiceLoader } from './shared.service';
import { AuthGuard } from './AuthGuard';
import { AngularFireAuth } from 'angularfire2/auth';
import { FlyersComponent } from './flyers/flyers.component';
import { SafeHtml } from './safehtml';
import { APP_CONFIG, AppConfig } from './app.config';
import { TransComponent } from './trans/trans.component';
import { AddmemberComponent } from './addmember/addmember.component';
import { MemberadminComponent } from './memberadmin/memberadmin.component';
import { ReportsComponent } from './reports/reports.component';
import { MembershipComponent } from './membership/membership.component';
import { StoreComponent } from './store/store.component';
import { EmployeeComponent } from './employee/employee.component';
import { BranchComponent } from './branch/branch.component';

import { PlHolderDirective } from './ce';
import { MemberhistComponent } from './memberhist/memberhist.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ContestsComponent } from './contests/contests.component';
import { ContestComponent } from './contest/contest.component';
export const firebaseConfig = {
  apiKey: 'AIzaSyDXLTjJFIUu3J4s587GrgR4X-H_pKqgwkc',
  authDomain: 'spasation-f8996.firebaseapp.com',
  databaseURL: 'https://spasation-f8996.firebaseio.com/', // davidrensh@hotmail.com 691117zy
  storageBucket: 'gs://spasation-f8996.appspot.com'
};
@NgModule({
  declarations: [
    SafeHtml,
    PlHolderDirective,
    AppComponent,
    NewsComponent,
    AboutComponent,
    LoginComponent,
    FlyersComponent,
    TransComponent,
    AddmemberComponent,
    MemberadminComponent,
    ReportsComponent,
    MembershipComponent,
    StoreComponent,
    EmployeeComponent,
    BranchComponent,
    MemberhistComponent,
    ChangePasswordComponent,
    ContestsComponent,
    ContestComponent
  ],
  imports: [
    AngularFireDatabaseModule,
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule, ReactiveFormsModule, FormsModule,
    HttpModule,
    AppRoutingModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  providers: [SafeHtml,{ provide: APP_CONFIG, useValue: AppConfig },
    AngularFireAuth, AuthGuard, {
    deps: [],
    provide: SharedService,
    useFactory: SharedServiceLoader// (jsonp: Jsonp, http: Http) => () => new EditService(jsonp, http)
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
