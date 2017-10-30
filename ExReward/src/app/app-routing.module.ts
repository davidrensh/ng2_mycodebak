import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsComponent } from './news/news.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { MyComponent } from './my/my.component';
import { AuthGuard } from './AuthGuard';
import { FlyersComponent } from './flyers/flyers.component';
import { HomeComponent } from './home/home.component';
import { NewsreadComponent } from './newsread/newsread.component';
import { FlyersreadComponent } from './flyersread/flyersread.component';
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

const routes: Routes = [
  { path: 'myhist', canActivate: [AuthGuard], component: MyComponent },
  { path: 'myprofile', canActivate: [AuthGuard], component: MyprofileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'home', component: HomeComponent },
  { path: 'news', component: NewsComponent },
  { path: 'contests', component: ContestsComponent },
  { path: 'contest/:id', component: ContestComponent },
  { path: 'moving', component: MovingComponent },
  { path: 'roofing', component: RoofingComponent },
  { path: 'plumbin', component: PlumbingComponent },
  { path: 'carpet', component: CarpetComponent },
  { path: 'duct', component: DuctComponent },
  { path: 'Renovations', component: RenovationsComponent },
  { path: 'concrete', component: ConcreteComponent },
  { path: 'nanny', component: NannyComponent },
  { path: 'lessons', component: LessonsComponent },
  { path: 'newsread/:id', component: NewsreadComponent },
  { path: 'flyersread/:id', component: FlyersreadComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
