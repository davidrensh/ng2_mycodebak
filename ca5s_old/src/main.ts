import { bootstrap } from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';
import { enableProdMode,provide } from '@angular/core';
import { AppComponent, environment } from './app/';
import {LocationStrategy,HashLocationStrategy} from '@angular/common';

import { FIREBASE_PROVIDERS, defaultFirebase,firebaseAuthConfig ,
    AuthMethods,
    AuthProviders} from 'angularfire2';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  FIREBASE_PROVIDERS,HTTP_PROVIDERS,
  // Initialize Firebase app  
  defaultFirebase({
    apiKey: "AIzaSyATQBviUqG6bbH4yZsMR6kQhyJVKfNyC2o",
    authDomain: "ca5s.firebaseapp.com", 
    databaseURL: "https://ca5s.firebaseio.com", //davidren808@gmail.com 1/1/2000      male    691117zy
    storageBucket: "gs://firebase-ca5s.appspot.com",
  }), firebaseAuthConfig({
        method: AuthMethods.Password,
        provider: AuthProviders.Password,
        remember: 'default',
        scope: ['email']
    }),
    provide(LocationStrategy, { useClass: HashLocationStrategy })
]);
