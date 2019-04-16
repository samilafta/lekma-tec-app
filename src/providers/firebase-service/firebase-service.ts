// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

/*
  Generated class for the FirebaseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseServiceProvider {

  constructor(public firedb: AngularFireDatabase, public fireauth: AngularFireAuth) {
    console.log('Hello FirebaseServiceProvider Provider');
  }


 //function to register new user to firebase database
 registerUser(data: any) {
  return this.fireauth.auth.createUserWithEmailAndPassword(data['email'], data['password']).then((user) => {
    // sign in user
    this.fireauth.auth.signInWithEmailAndPassword(data['email'], data['password']).then((authenticatedUser) => {
      // add user details to database
      // var userId = this.fireauth.auth.currentUser.uid;
      data['uid'] = authenticatedUser.user.uid;
      this.firedb.database.ref("lab_technicians").child(authenticatedUser.user.uid).set(data);
      // send sms to user for successful registration
      // this.sendSms("Tow App", msg);

    });
  });
}

// function to sign in user
signinUser(data) {
  return this.fireauth.auth.signInWithEmailAndPassword(data['email'], data['password']).then((auth) => {
  });
}

// function to log out user
signoutUser() {
  return this.fireauth.auth.signOut();
}

addRequest(data: any) {
    var userId = this.fireauth.auth.currentUser.uid;

    return this.firedb.database.ref("requests").push({
      user_id: userId,
      book_date: data['book_date'],
      book_session: data['book_session'],
      lab_type: data['lab_type'],
      status: "pending",
      created_at: Date.now()
    });
}

getNotifications() {
  // var userId = this.fireauth.auth.currentUser.uid;
  return this.firedb.list("/requests");
}

getAcceptedRequests() {
  return this.firedb.list("/requests", ref => ref.orderByChild("status").equalTo("accepted"));
}

updateRequestStatus(created_at){
    this.firedb.list('/requests', ref => ref.orderByChild('created_at').equalTo(created_at)).snapshotChanges()
    .subscribe(actions => {
        actions.forEach(action => {
          // here you get the key
          console.log(action.key);
          this.firedb.list('/requests').update(action.key, { status: "accepted" });
        });
    });
}

cancelRequest(created_at){
    this.firedb.list('/requests', ref => ref.orderByChild('created_at').equalTo(created_at)).snapshotChanges()
    .subscribe(actions => {
        actions.forEach(action => {
          // here you get the key
          console.log(action.key);
          this.firedb.list('/requests').update(action.key, { status: "cancelled" });
        });
    });
}

addLabResults(userId, userName, labType, bookDate, bookSession, labResults) {
  
    return this.firedb.database.ref("lab_results").push({
      user_id: userId,
      book_date: bookDate,
      book_session: bookSession,
      lab_type: labType,
      lab_results: labResults,
      created_at: Date.now()
    });
}

getLabResults() {
  return this.firedb.list("/lab_results");
}


}
