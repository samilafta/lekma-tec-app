import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { Observable } from 'rxjs/Observable';
import { CallNumber } from '@ionic-native/call-number';
import { ModalPage } from '../modal/modal';
import { ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-lab',
  templateUrl: 'lab.html',
})
export class LabPage {

  notifications: Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public commom: CommonProvider, public firebaseService: FirebaseServiceProvider,
  public call: CallNumber, public modalCtrl : ModalController) {

    this.commom.startLoading();
    this.notifications = firebaseService.getAcceptedRequests().valueChanges();
    console.log(this.notifications);
    this.commom.stopLoading();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LabPage');
  }

  callNumber(number){

  this.call.callNumber(String(number), true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));

  }

  addLabResults(patientID, patientName, bDate, bSession, lType) {
      let modal = this.modalCtrl.create(ModalPage, {
        user_id: patientID,
        book_date: bDate,
        book_session: bSession,
        lab_type: lType,
        user_name: patientName
      }, { cssClass: 'inset-modal' });
      modal.present();
  }


}
