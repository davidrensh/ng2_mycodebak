import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { LoginComponent } from "./login/login.component";

import { AuthGuard } from "./AuthGuard";
import { FlyersComponent } from "./flyers/flyers.component";
import { ReportsComponent } from "./reports/reports.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  { path: "reports", canActivate: [AuthGuard], component: ReportsComponent },
  { path: "login", component: LoginComponent, pathMatch: "full" },
  { path: "about", component: AboutComponent },
  { path: "flyers", canActivate: [AuthGuard], component: FlyersComponent },
  { path: "", component: HomeComponent, pathMatch: "full" },
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
