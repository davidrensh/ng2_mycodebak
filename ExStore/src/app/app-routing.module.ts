import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NewsComponent } from './news/news.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './AuthGuard';
import { FlyersComponent } from './flyers/flyers.component';
import { TransComponent } from './trans/trans.component';
import { AddmemberComponent } from './addmember/addmember.component';
import { MemberadminComponent } from './memberadmin/memberadmin.component';
import { ReportsComponent } from './reports/reports.component';
import { MembershipComponent } from './membership/membership.component';
import { StoreComponent } from './store/store.component';
import { EmployeeComponent } from './employee/employee.component';
import { BranchComponent } from './branch/branch.component';
import { MemberhistComponent } from './memberhist/memberhist.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ContestsComponent } from './contests/contests.component';
import { ContestComponent } from './contest/contest.component';
const routes: Routes = [
  { path: 'biz', canActivate: [AuthGuard], component: TransComponent },
  { path: 'addmember', canActivate: [AuthGuard], component: AddmemberComponent },
  { path: 'employee', canActivate: [AuthGuard], component: EmployeeComponent },
  { path: 'contests', canActivate: [AuthGuard], component: ContestsComponent },
  { path: 'contest/:id', component: ContestComponent },
  { path: 'changepassword', canActivate: [AuthGuard], component: ChangePasswordComponent },
  { path: 'memberadmin', canActivate: [AuthGuard], component: MemberadminComponent },
  { path: 'reports', canActivate: [AuthGuard], component: ReportsComponent },
  { path: 'membership', canActivate: [AuthGuard], component: MembershipComponent },
  { path: 'store', canActivate: [AuthGuard], component: StoreComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'hist/:id/:store', component: MemberhistComponent },
  { path: 'branch', canActivate: [AuthGuard], component: BranchComponent },
  { path: 'news', canActivate: [AuthGuard], component: NewsComponent },
  { path: 'flyers', canActivate: [AuthGuard], component: FlyersComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
