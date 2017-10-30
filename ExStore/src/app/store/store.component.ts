import { SharedService } from '../shared.service';
import { Component, OnInit, OnDestroy, NgModule, VERSION } from '@angular/core';
import { Sort } from '@angular/material';
import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Subscription } from 'rxjs/Subscription';
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  errmsg = '';
  name = '';
  id = '';
  mainapiKey = '';
  mainauthDomain = '';
  maindatabaseURL = '';
  mainstorageBucket = '';
  url = '';
  city = '';
  constructor(private af: AngularFireDatabase, public afAuth: AngularFireAuth, private ss: SharedService, private router: Router) {
    this.af.object('/c').subscribe(p => {
      this.name = p.name;
      this.id = p.id;
      this.mainapiKey = p.mainapiKey;
      this.mainauthDomain = p.mainauthDomain;
      this.maindatabaseURL = p.maindatabaseURL;
      this.mainstorageBucket = p.mainstorageBucket;
      this.url = p.url;
      this.city = p.city;
    });
  }

  ngOnInit() {
  }
  save() {
    if (!this.ss.isValidKey(this.name)) {
      this.errmsg = 'Invalid store name!';
      return;
    }
    this.af.object('/c').update({
      name: this.name,
      id: this.id,
      mainapiKey: this.mainapiKey,
      mainauthDomain: this.mainauthDomain,
      maindatabaseURL: this.maindatabaseURL,
      mainstorageBucket: this.mainstorageBucket,
      city: this.city,
      url: this.url
    });
    const app = this.ss.getMainDBApp(); //  firebase.initializeApp(config);
    if (app === null) {
      this.router.navigate(['/login']);
      return;
    }
    const refStore = app.database().ref('/stores/' + this.ss.storeSetting.name );
    const storeObj = this.af.object(refStore);
    storeObj.update({
      city: this.city,
      url: this.ss.storeSetting.url,
      mainauthDomain: this.mainauthDomain,
      maindatabaseURL: this.maindatabaseURL,
      mainstorageBucket: this.mainstorageBucket,
    });
  }
}
