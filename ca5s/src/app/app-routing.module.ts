import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NewsComponent } from "./news/news.component";
import { AboutComponent } from "./about/about.component";
import { LoginComponent } from "./login/login.component";

import { AuthGuard } from "./AuthGuard";
import { FlyersComponent } from "./flyers/flyers.component";
import { ReportsComponent } from "./reports/reports.component";
import { HomeComponent } from "./home/home.component";
import { QuoteComponent } from "./quote/quote.component";
import { MovingComponent } from "./moving/moving.component";
import { MystatusComponent } from "./mystatus/mystatus.component";
import { JoinComponent } from "./join/join.component";
import { JobsComponent } from "./jobs/jobs.component";
import { ScheduleComponent } from "./schedule/schedule.component";
import { MysettingComponent } from "./mysetting/mysetting.component";
import { MyprofileComponent } from "./myprofile/myprofile.component";
import { WhyComponent } from "./why/why.component";
import { ContactComponent } from "./contact/contact.component";
import { JoinedComponent } from "./joined/joined.component";
import { ServicesComponent } from "./services/services.component";
import { RoofingComponent } from "./roofing/roofing.component";
import { WeldingComponent } from "./welding/welding.component";
import { RenovationsComponent } from "./renovations/renovations.component";
import { PaintersComponent } from "./painters/painters.component";
import { LawnComponent } from "./lawn/lawn.component";
import { EavestoughComponent } from "./eavestough/eavestough.component";
import { ConcreteComponent } from "./concrete/concrete.component";
import { SnowComponent } from "./snow/snow.component";
import { PlumbingComponent } from "./plumbing/plumbing.component";
import { FenceComponent } from "./fence/fence.component";
import { ElectricianComponent } from "./electrician/electrician.component";
import { FlooringComponent } from "./flooring/flooring.component";
import { DrywallComponent } from "./drywall/drywall.component";
import { HeatingComponent } from "./heating/heating.component";
import { ExcavationComponent } from "./excavation/excavation.component";
import { WindowsComponent } from "./windows/windows.component";
import { ApplianceComponent } from "./appliance/appliance.component";
import { PavingComponent } from "./paving/paving.component";
import { GarageComponent } from "./garage/garage.component";
import { InsulationComponent } from "./insulation/insulation.component";
import { SepticComponent } from "./septic/septic.component";
import { WaterComponent } from "./water/water.component";
import { SurveillanceComponent } from "./surveillance/surveillance.component";
import { ComputerComponent } from "./computer/computer.component";
import { SoftwareComponent } from "./software/software.component";
import { CarpetComponent } from "./carpet/carpet.component";
import { CleaningComponent } from "./cleaning/cleaning.component";

const routes: Routes = [
  { path: "reports", canActivate: [AuthGuard], component: ReportsComponent },
  { path: "login", component: LoginComponent, pathMatch: "full" },
  { path: "about", component: AboutComponent },
  // { path: 'Moving', component: MovingComponent },
  {
    path: "quote/:commercial",
    component: QuoteComponent,
    children: [
      { path: "Moving", component: MovingComponent, pathMatch: "full" },
      { path: "Roofing", component: RoofingComponent },
      { path: "Moving", component: MovingComponent },
      { path: "Welding", component: WeldingComponent },
      { path: "Renovations", component: RenovationsComponent },
      { path: "Painters", component: PaintersComponent },
      { path: "Lawn", component: LawnComponent },
      { path: "Eavestough", component: EavestoughComponent },
      { path: "Concrete", component: ConcreteComponent },
      { path: "Snow", component: SnowComponent },
      { path: "Plumbing", component: PlumbingComponent },
      { path: "Fence", component: FenceComponent },
      { path: "Electrician", component: ElectricianComponent },
      { path: "Flooring", component: FlooringComponent },
      { path: "Drywall", component: DrywallComponent },
      { path: "Heating", component: HeatingComponent },
      { path: "Excavation", component: ExcavationComponent },
      { path: "Windows", component: WindowsComponent },
      { path: "Appliance", component: ApplianceComponent },
      { path: "Paving", component: PavingComponent },
      { path: "Garage", component: GarageComponent },
      { path: "Insulation", component: InsulationComponent },
      { path: "Septic", component: SepticComponent },
      { path: "Water", component: WaterComponent },
      { path: "Surveillance", component: SurveillanceComponent },
      { path: "Computer", component: ComputerComponent },
      { path: "Software", component: SoftwareComponent },
      { path: "Carpet", component: CarpetComponent },
      { path: "Cleaning", component: CleaningComponent }
    ]
  },
  { path: "news", canActivate: [AuthGuard], component: NewsComponent },
  { path: "flyers", canActivate: [AuthGuard], component: FlyersComponent },
  { path: "", component: HomeComponent, pathMatch: "full" },
  { path: "mystatus", component: MystatusComponent },
  { path: "join", component: JoinComponent },
  { path: "jobs", component: JobsComponent },
  { path: "schedule", component: ScheduleComponent },
  { path: "mysetting", component: MysettingComponent },
  { path: "myprofile", component: MyprofileComponent },
  { path: "why", component: WhyComponent },
  { path: "contact", component: ContactComponent },
  { path: "joined", component: JoinedComponent },
  { path: "services", component: ServicesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
