import { Component } from '@angular/core';
import {NgIf, NgFor} from '@angular/common';
//import {Http,ConnectionBackend,RequestOptions} from '@angular/http';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import {MdButton} from '@angular2-material/button/button';
import {MD_SIDENAV_DIRECTIVES, MdSidenav} from '@angular2-material/sidenav/sidenav';
import {MdCard} from '@angular2-material/card/card';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list/list';
import { provideRouter, RouterConfig }  from '@angular/router';
import {MdIcon,MdIconRegistry} from '@angular2-material/icon/icon';
//import { crisisCenterRoutes } from './crisis-center/crisis-center.routes';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [MD_SIDENAV_DIRECTIVES, MdButton, MD_LIST_DIRECTIVES, MdIcon, NgIf, NgFor],
  providers: [MdIconRegistry] 
})
export class AppComponent {
  // items: FirebaseListObservable<any[]>;
  leftBarOpen: boolean = false;

  //item: FirebaseObjectObservable<any>;
  constructor(public af: AngularFire) {
    //this.item = af.database.object('/item');
  }
  // save(newName: string) {
  //   this.item.set({ name: newName });
  // }
  // update(newSize: string) {
  //   this.item.update({ size: newSize });
  // }
  // delete() {
  //   this.item.remove();
  // }
  toggleLeft() {
    this.leftBarOpen = !this.leftBarOpen;
  }
  // showsnapshot() {
  //   let item2: FirebaseObjectObservable<any>;
  //   item2 =this.af.database.object('/item', { preserveSnapshot: true });
  //   item2.subscribe(snapshot => {
  //     console.log(snapshot.key)
  //     console.log(snapshot.val())
  //   });
  // }
}


// import { Component } from '@angular/core';
// import { AngularFire, FirebaseListObservable } from 'angularfire2';
// @Component({
//   moduleId: module.id,
//   selector: 'app-root',
//   templateUrl: 'app.component.html',
//   styleUrls: ['app.component.css']
// })
// export class AppComponent {
//   items: FirebaseListObservable<any[]>;
//   title = 'app works!';
//   constructor(af: AngularFire) {
//     this.items = af.database.list('items');
//   }
// }
