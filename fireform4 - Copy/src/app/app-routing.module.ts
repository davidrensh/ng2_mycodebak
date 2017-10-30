import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
const routes: Routes = [
  { path: 'demo', component: DemoComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'free', component: FreeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'myform', component: MyformsComponent },
  { path: 'share', component: SharedwithmeComponent },
  { path: 'editor', component: TempeditorComponent },
  { path: 'convert', component: ConvertformsComponent },
  { path: 'trash', component: TrashComponent },
  { path: 'help', component: HelpComponent },

  { path: 'setting', component: SettingComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'storage', component: StorageComponent },

  { path: 'about', component: AboutComponent },

  { path: 'show/:id', component: ShowComponent }, 
    { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
