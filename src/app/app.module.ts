import { LoginPage } from './../pages/login/login';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ResultsPage } from '../pages/results/results';
import { LabPage } from '../pages/lab/lab';
import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { IonicStorageModule } from '@ionic/storage';
import { FirebaseServiceProvider } from '../providers/firebase-service/firebase-service';
import { CommonProvider } from '../providers/common/common';
import { RequestPage } from '../pages/request/request';
import { ModalPage } from '../pages/modal/modal';
// import { SMS } from '@ionic-native/sms';
import { CallNumber } from '@ionic-native/call-number';


const config = {
  apiKey: "AIzaSyDajksN8sQlP3lSZA4M0eQRnvRCCxgJU4Q",
  authDomain: "laboratory-b5355.firebaseapp.com",
  databaseURL: "https://laboratory-b5355.firebaseio.com",
  projectId: "laboratory-b5355",
  storageBucket: "laboratory-b5355.appspot.com",
  messagingSenderId: "814505019339"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RequestPage,
    LabPage,
    ModalPage,
    ResultsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(config),
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RequestPage,
    LabPage,
    ModalPage,
    ResultsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseServiceProvider,
    CommonProvider,
    // SMS,
    CallNumber
  ]
})
export class AppModule {}
