import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { MaterialModule, MdNativeDateModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SafeHtml } from './safehtml';
import { ShareButtonsModule } from 'ngx-sharebuttons';
import { AppComponent } from './app.component';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { NewsComponent } from './news/news.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { MyComponent } from './my/my.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedService, SharedServiceLoader } from './shared.service';
import { AuthGuard } from './AuthGuard';
import { AngularFireAuth } from 'angularfire2/auth';
import { FlyersComponent } from './flyers/flyers.component';
import { HomeComponent } from './home/home.component';
import { NewsreadComponent } from './newsread/newsread.component';
import { FlyersreadComponent } from './flyersread/flyersread.component';
import { SocialShareButtonComponent } from './social-share-button/social-share-button.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { QuoteComponent } from './quote/quote.component';
import { MoversComponent } from './movers/movers.component';
import { RequestsComponent } from './requests/requests.component';
import { TasksComponent } from './tasks/tasks.component';
import { EmployeeComponent } from './employee/employee.component';
import { ReportsComponent } from './reports/reports.component';
import { CompanyComponent } from './company/company.component';
import { BranchComponent } from './branch/branch.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MyTaskComponent } from './my-task/my-task.component';
import { MyHistoryComponent } from './my-history/my-history.component';
import { ProfileComponent } from './profile/profile.component';
export const firebaseConfig = {
  apiKey: 'AIzaSyA3NFTI_f3W8AheEUX-NeJrfjtkv7pcO98',
  authDomain: 'exreward.firebaseapp.com',
  databaseURL: 'https://exreward.firebaseio.com/',//dren1117@gmail.com
  storageBucket: 'gs://exreward.appspot.com'
};
@NgModule({
  declarations: [
    SafeHtml,
    AppComponent,
    NewsComponent,
    AboutComponent,
    LoginComponent,
    MyComponent,
    FlyersComponent,
    HomeComponent,
    NewsreadComponent,
    FlyersreadComponent,
    SocialShareButtonComponent,
    MyprofileComponent,
    QuoteComponent,
    MoversComponent,
    RequestsComponent,
    TasksComponent,
    EmployeeComponent,
    ReportsComponent,
    CompanyComponent,
    BranchComponent,
    ChangePasswordComponent,
    MyTaskComponent,
    MyHistoryComponent,
    ProfileComponent
  ],
  entryComponents: [
    SocialShareButtonComponent
  ],
  imports: [
    ShareButtonsModule.forRoot(),
    // SocialShareButtonComponent,
    AngularFireDatabaseModule,
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  providers: [SafeHtml, AngularFireAuth, AuthGuard, {
    deps: [],
    provide: SharedService,
    useFactory: SharedServiceLoader
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
