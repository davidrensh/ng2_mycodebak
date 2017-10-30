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

const routes: Routes = [
  { path: 'tracking', canActivate: [AuthGuard], component: MyHistoryComponent },
  { path: 'myprofile', canActivate: [AuthGuard], component: MyprofileComponent },
  { path: 'profile', canActivate: [AuthGuard], component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'home', component: HomeComponent },
  { path: 'news', component: NewsComponent },
  { path: 'quote', component: QuoteComponent },
  { path: 'movers', component: MoversComponent },
  { path: 'requests', component: RequestsComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'mytasks', component: MyTaskComponent },
  { path: 'employee', canActivate: [AuthGuard], component: EmployeeComponent },
  { path: 'changepassword', canActivate: [AuthGuard], component: ChangePasswordComponent },
  // { path: 'memberadmin', canActivate: [AuthGuard], component: MemberadminComponent },
  { path: 'reports', canActivate: [AuthGuard], component: ReportsComponent },
  // { path: 'membership', canActivate: [AuthGuard], component: MembershipComponent },
  { path: 'company', canActivate: [AuthGuard], component: CompanyComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  // { path: 'hist', component: HistoryComponent },
  { path: 'branch', canActivate: [AuthGuard], component: BranchComponent },
  
  { path: 'flyers', component: FlyersComponent },
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
