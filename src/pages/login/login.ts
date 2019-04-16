import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private opt: string = 'signin';
  userData = {
    "email": "",
    "password": ""
  };

  regData = {
    "first_name": "",
    "last_name": "",
    "email": "",
    "password": "",
    "phone": "",
    "created_at": Date.now()
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public menuCtrl: MenuController, public common: CommonProvider,
    public firebaseService: FirebaseServiceProvider, public store: Storage) {

      this.menuCtrl.enable(false);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }



  signin() {

    this.common.startLoading();
    this.firebaseService.signinUser(this.userData).then((authData) => {
      // success
      this.common.stopLoading();
      this.navCtrl.setRoot(HomePage);
      this.setLoginKey(true);

    }, error => {
      this.common.stopLoading();
      this.common.showAlert(error);

    });

  }

  register() {

    if(this.regData.first_name == "" && this.regData.last_name == "" && this.regData.email &&
    this.regData.phone == "" && this.regData.password == ""){

      this.common.showAlert("All fields are required.");

    } else {

      this.common.startLoading();

      this.firebaseService.registerUser(this.regData).then((authData) => {
        // successful
        this.common.stopLoading();
        // this.navCtrl.setRoot(HomePage);
        // this.setLoginKey(true);
        this.common.presentToast("Successfully Registered. Please Login");

      }, error => {
        //error occrred
        this.common.stopLoading();
        this.common.showAlert(error);
      });

    }

  }

  setLoginKey(status) {
    return new Promise(resolve => {
      this.store
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
