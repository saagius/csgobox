import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Apollo
import { GraphQLModule } from './graphql.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { boxReducer } from './store/box/box.reducer';
import { BoxModule } from './box/box.module';
import { BoxesModule } from './boxes/boxes.module';
import { EffectsModule } from '@ngrx/effects';
import { BoxEffects } from './store/box/box.effects';
import { CurrentUserEffects } from './store/currentUser/currentUser.effects';
import { currentUserReducer } from './store/currentUser/currentUser.reducer';
import { LoginModule } from './login/login.module';
import { BoxDetailModule } from './boxDetail/boxDetail.module';
import { wonItemReducer } from './store/wonItem/wonItem.reducer';
import { WonItemModule } from './wonItem/wonItem.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    GraphQLModule,
    StoreModule.forRoot({
      box: boxReducer,
      currentUser: currentUserReducer,
      wonItem: wonItemReducer
    },{}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    }),
    AppRoutingModule,
    EffectsModule.forRoot([
        BoxEffects, CurrentUserEffects
    ]),
    LoginModule,
    BoxModule,
    BoxesModule,
    BoxDetailModule,
    WonItemModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
