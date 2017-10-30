import { Component, ViewEncapsulation } from '@angular/core';//,Directive, ComponentMetadata, Input, ReflectiveInjector, ViewContainerRef, Compiler,NgModule 
import { RoleService } from './role.service';
import { NgIf, NgFor } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FreeComponent } from './free/free.component';
//import {Http,ConnectionBackend,RequestOptions} from '@angular/http';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { MdChip, MdChipList, MdButton, MdSidenav, MdCard, MdIcon, MdIconRegistry } from '@angular/material';
//import {MD_SIDENAV_DIRECTIVES} from '@angular/material';
//import {MdCard} from '@angular2-material/card/card';
//import {MD_LIST_DIRECTIVES} from '@angular2-material/list/list';

//import { MdIcon, MdIconRegistry } from '@angular2-material/icon/icon';
import { MdDialog, MdDialogRef } from '@angular/material';
@Component({
  //moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',//
  styleUrls: ['app.component.css'],
  providers: [RoleService],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'Fireform 4';
  constructor(public rs: RoleService, public dialog: MdDialog, public signupdialog: MdDialog) {
    this.rs.role = 0;
  }
  loginDialog() {
    let dialogRef = this.dialog.open(LoginComponent);
    dialogRef.afterClosed().subscribe(result => {
      //this.selectedOption = result;
    });
  }
  signupDialog() {
    let dialogRef = this.signupdialog.open(FreeComponent);
    dialogRef.afterClosed().subscribe(result => {
      //this.selectedOption = result;
    });
  }

}