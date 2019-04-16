import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CommonProvider } from './../../providers/common/common';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  lab_results: string = "";
  user_id: any = "";
  book_date: string = "";
  book_session: string = "";
  lab_type: string = ""
  user_name: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public viewCtrl: ViewController, public common: CommonProvider,
  public firebaseService: FirebaseServiceProvider,) {

      this.user_id = this.navParams.get('user_id');
      this.book_date = this.navParams.get('book_date');
      this.book_session = this.navParams.get('book_session');
      this.lab_type = this.navParams.get('lab_type');
      this.user_name = this.navParams.get('user_name');

      console.log('UserId', this.navParams.get('user_name'));

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  submitResults(userId, userName, labType, bookDate, bookSession) {

    if(this.lab_results == ""){
      this.common.showAlert("Lab Results field is required.");
    } else {

    this.firebaseService.addLabResults(userId, userName, labType, bookDate, bookSession, this.lab_results)
    .then(() => {
      // successfull
      this.common.stopLoading();
      this.viewCtrl.dismiss();
      this.common.showAlert("Lab Results Added Successfully");

    }, (err) => {
      this.common.stopLoading();
      this.common.showAlert(err);
    });

    }

  }

}
