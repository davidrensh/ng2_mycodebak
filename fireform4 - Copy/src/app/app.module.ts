import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

//import { COMPILER_PROVIDERS } from '@angular/compiler';
import { AngularFireModule } from 'angularfire2';
import { MaterialModule } from '@angular/material';
import {FlexLayoutModule } from '@angular/flex-layout'

import { CKEditorModule } from 'ng2-ckeditor';

//import { routing, appRoutingProviders } from './myrouting/myrouting.component';
import { SignaturePad } from './signature-pad';// 'angular2-signaturepad';
//import { DynamicModule } from './dynamic/dynamic.module';

import { AppComponent } from './app.component';
import { ShowComponent } from './show/show.component';
import { TempeditorComponent } from './tempeditor/tempeditor.component';
import { DemoComponent } from './demo/demo.component';
import { PricingComponent } from './pricing/pricing.component';
import { FreeComponent } from './free/free.component';
import { LoginComponent } from './login/login.component';
import { MyformsComponent } from './myforms/myforms.component';
import { SharedwithmeComponent } from './sharedwithme/sharedwithme.component';
import { TrashComponent } from './trash/trash.component';
import { HelpComponent } from './help/help.component';
import { ConvertformsComponent } from './convertforms/convertforms.component';
import { SettingComponent } from './setting/setting.component';
import { UserComponent } from './user/user.component';
import { PaymentComponent } from './payment/payment.component';
import { StorageComponent } from './storage/storage.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { MyworkflowComponent } from './myworkflow/myworkflow.component';

export const firebaseConfig = {
  apiKey: "AIzaSyDUKlFAFOci3eIKn84YGr4Z1A4fexfyfNg",
  authDomain: "formaas.firebaseapp.com",
  databaseURL: "https://formaas.firebaseio.com",//dren1117@gmail.com
  storageBucket: "gs://firebase-formaas.appspot.com"
};
@NgModule({
  declarations: [
    AppComponent,
    TempeditorComponent,
    ShowComponent,
    SignaturePad,
    DemoComponent,
    PricingComponent,
    FreeComponent,
    LoginComponent,
    MyformsComponent,
    SharedwithmeComponent,
    TrashComponent,
    HelpComponent,
    ConvertformsComponent,
    SettingComponent,
    UserComponent,
    PaymentComponent,
    StorageComponent,
    AboutComponent,
    HomeComponent,
    MyworkflowComponent,
  ],
  imports: [
    MaterialModule.forRoot(),
    FlexLayoutModule,
    CKEditorModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
   // DynamicModule.forRoot() // singletons
  ],
  //providers: [COMPILER_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
