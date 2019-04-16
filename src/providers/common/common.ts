import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from 'ionic-angular';

/*
  Generated class for the CommonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommonProvider {

  loading: any;

  constructor(public loadingCtrl: LoadingController, public toastCtrl: ToastController,
    public alertCtrl: AlertController) {
    console.log('Hello CommonProvider Provider');
  }


 // display loader
 startLoading(){
  this.loading = this.loadingCtrl.create({
    content: 'Please wait...',
    spinner: "dots",
  });
    this.loading.present();
}

// stop loader
stopLoading(){
  setTimeout(() => {
    this.loading.dismiss();
  }, 100);
}

// show a toast message
presentToast(msg) {
  const toast = this.toastCtrl.create({
    message: msg,
    duration: 3000,
    position: 'bottom'
  });

  toast.present();
}

// display alert
showAlert(msg) {
  const alert = this.alertCtrl.create({
    message: msg,
    buttons: ['OK']
  });

  alert.present();
}



}
