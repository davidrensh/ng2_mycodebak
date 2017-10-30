import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, provide } from '@angular/core';
import { WelderlogAppComponent, environment } from './app/';

import {
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
     Router
} from '@angular/router';
import {LocationStrategy,HashLocationStrategy} from '@angular/common';
import {AngularFire, FIREBASE_PROVIDERS,
    defaultFirebase,
    firebaseAuthConfig,
    AuthMethods,
    AuthProviders} from 'angularfire2';
import { RoleService } from './app/role.service';


if (environment.production) {
  enableProdMode();
}

bootstrap(WelderlogAppComponent, [
    RoleService,
    FIREBASE_PROVIDERS,
    defaultFirebase('https://welderlog.firebaseio.com'), firebaseAuthConfig({
        method: AuthMethods.Password,
        provider: AuthProviders.Password,
        remember: 'default',
        scope: ['email']
    }),
    ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy })
]);
