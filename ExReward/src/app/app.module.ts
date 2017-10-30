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
import { MovingComponent } from './moving/moving.component';
import { RoofingComponent } from './roofing/roofing.component';
import { PlumbingComponent } from './plumbing/plumbing.component';
import { CarpetComponent } from './carpet/carpet.component';
import { DuctComponent } from './duct/duct.component';
import { RenovationsComponent } from './renovations/renovations.component';
import { ConcreteComponent } from './concrete/concrete.component';
import { NannyComponent } from './nanny/nanny.component';
import { LessonsComponent } from './lessons/lessons.component';
import { ContestsComponent } from './contests/contests.component';
import { ContestComponent } from './contest/contest.component';
import { CouponComponent } from './coupon/coupon.component';
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
    MovingComponent,
    RoofingComponent,
    PlumbingComponent,
    CarpetComponent,
    DuctComponent,
    RenovationsComponent,
    ConcreteComponent,
    NannyComponent,
    LessonsComponent,
    ContestsComponent,
    ContestComponent,
    CouponComponent
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
