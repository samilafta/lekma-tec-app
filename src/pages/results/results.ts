import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage {

results: Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,  
  public common: CommonProvider, public firebaseService: FirebaseServiceProvider,) {

      this.common.startLoading(); 
      this.results = firebaseService.getLabResults().valueChanges();
      console.log(this.results);
      this.common.stopLoading();  

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultsPage');
  }

}
