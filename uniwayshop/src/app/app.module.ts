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
export const firebaseConfig = {
  apiKey: "AIzaSyCdmugg4N1c36A6_yHMDx61SHTRxjtt2f0",
  authDomain: "uniwayshop.firebaseapp.com",
  databaseURL: "https://uniwayshop.firebaseio.com/", // davidren808@hotmail.com 691117zy
  storageBucket: "gs://uniwayshop.appspot.com",
  projectId: "uniwayshop"
};
@NgModule({
  declarations: [
    SafeHtml,
    PlHolderDirective,
    AppComponent,
    AboutComponent,
    LoginComponent,
    FlyersComponent,
    ReportsComponent,
    HomeComponent,
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
export class AppModule { }
