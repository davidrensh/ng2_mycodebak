import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AngularFireModule } from "angularfire2";
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule
} from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { CdkTableModule } from "@angular/cdk/table";
import { AppComponent } from "./app.component";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { NewsComponent } from "./news/news.component";
import { AboutComponent } from "./about/about.component";
import { LoginComponent } from "./login/login.component";

import { AppRoutingModule } from "./app-routing.module";
import { SharedService, SharedServiceLoader } from "./shared.service";
import { AuthGuard } from "./AuthGuard";
import { AngularFireAuth } from "angularfire2/auth";
import { FlyersComponent } from "./flyers/flyers.component";
import { SafeHtml } from "./safehtml";
import { ReportsComponent } from "./reports/reports.component";

import { PlHolderDirective } from "./ce";
import { HomeComponent } from "./home/home.component";
import { QuoteComponent } from "./quote/quote.component";
import { CtlAddressComponent } from "./ctl-address/ctl-address.component";
import { CtlLoginComponent } from "./ctl-login/ctl-login.component";
import { CtlContactComponent } from "./ctl-contact/ctl-contact.component";
import { CtlServiceTypeComponent } from "./ctl-service-type/ctl-service-type.component";
import { MovingComponent } from "./moving/moving.component";
import { ServicesComponent } from "./services/services.component";
import { MystatusComponent } from "./mystatus/mystatus.component";
import { JoinComponent } from "./join/join.component";
import { JobsComponent } from "./jobs/jobs.component";
import { ScheduleComponent } from "./schedule/schedule.component";
import { MysettingComponent } from "./mysetting/mysetting.component";
import { MyprofileComponent } from "./myprofile/myprofile.component";
import { WhyComponent } from "./why/why.component";
import { ContactComponent } from "./contact/contact.component";
import { JoinedComponent } from "./joined/joined.component";
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

export const firebaseConfig = {
  apiKey: "AIzaSyC1zAJYEaJzMTiqJTei2NI282yuJOENc_M",
  authDomain: "ca5s.firebaseapp.com",
  databaseURL: "https://ca5s.firebaseio.com/", // davidren808@hotmail.com 691117zy
  storageBucket: "gs://firebase-ca5s.appspot.com",
  projectId: "firebase-ca5s"
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
    ReportsComponent,
    HomeComponent,
    QuoteComponent,
    CtlAddressComponent,
    CtlLoginComponent,
    CtlContactComponent,
    CtlServiceTypeComponent,
    MovingComponent,
    ServicesComponent,
    MystatusComponent,
    JoinComponent,
    JobsComponent,
    ScheduleComponent,
    MysettingComponent,
    MyprofileComponent,
    WhyComponent,
    ContactComponent,
    JoinedComponent,
    RoofingComponent,
    WeldingComponent,
    RenovationsComponent,
    PaintersComponent,
    LawnComponent,
    EavestoughComponent,
    ConcreteComponent,
    SnowComponent,
    PlumbingComponent,
    FenceComponent,
    ElectricianComponent,
    FlooringComponent,
    DrywallComponent,
    HeatingComponent,
    WindowsComponent,
    ApplianceComponent,
    PavingComponent,
    GarageComponent,
    InsulationComponent,
    SepticComponent,
    WaterComponent,
    SurveillanceComponent,
    ComputerComponent,
    SoftwareComponent,
    CarpetComponent,
    CleaningComponent,
    ExcavationComponent
  ],
  imports: [
    AngularFireDatabaseModule,
    CdkTableModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [
    SafeHtml,
    AngularFireAuth,
    AuthGuard,
    {
      deps: [],
      provide: SharedService,
      useFactory: SharedServiceLoader // (jsonp: Jsonp, http: Http) => () => new EditService(jsonp, http)
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
