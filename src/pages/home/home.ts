import { RequestPage } from './../request/request';
import { CommonProvider } from './../../providers/common/common';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { LabPage } from '../lab/lab';
import { ResultsPage } from '../results/results';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userInfo: any = {};

  constructor(public navCtrl: NavController, public common: CommonProvider,
    public storage: Storage,  public fireauth: AngularFireAuth,
    public firedb: AngularFireDatabase) {

      var userId = this.fireauth.auth.currentUser.uid;
      this.firedb.database.ref('/lab_technicians/' + userId).once('value', userSnapShot => {
         this.userInfo = userSnapShot.val();
      });

  }

  openNotifications() {
    this.navCtrl.push(RequestPage);
  }

  openAccepted() {
    this.navCtrl.push(LabPage);
  }

  openResults() {
    this.navCtrl.push(ResultsPage);
  }

  logout() {

    this.common.startLoading();
    this.setLoginKey(false);

    this.navCtrl.setRoot(LoginPage);
    this.common.stopLoading();

  }

  setLoginKey(status) {
    return new Promise(resolve => {
      this.storage
        .set("admin_logged_in", status)
        .then(res => {
          resolve(true);
        })
        .catch(err => {
          console.error(err);
          resolve(false);
        });
    });
  }



}
