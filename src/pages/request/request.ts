import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { Observable } from 'rxjs/Observable';
import { CallNumber } from '@ionic-native/call-number';

@IonicPage()
@Component({
  selector: 'page-request',
  templateUrl: 'request.html',
})
export class RequestPage {

  notifications: Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public common: CommonProvider, public firebaseService: FirebaseServiceProvider,
    private call: CallNumber) {

      this.common.startLoading();
      this.notifications = firebaseService.getNotifications().valueChanges();
      console.log(this.notifications);
      this.common.stopLoading();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestPage');
  }

  acceptRequest(created_at){

    this.common.startLoading();
    this.firebaseService.updateRequestStatus(created_at);
    this.common.stopLoading();
    this.common.showAlert("Request Accepted");
  }

  cancelRequest(created_at){

    this.common.startLoading();
    this.firebaseService.cancelRequest(created_at);
    this.common.stopLoading();
    this.common.showAlert("Request Cancelled");
  }

  callNumber(number){

  this.call.callNumber(String(number), true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));

  }



}
