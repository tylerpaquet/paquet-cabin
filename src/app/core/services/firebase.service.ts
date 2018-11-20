import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class FirebaseService {

  constructor(public db: AngularFirestore) {}

  getUser(userKey){
    return this.db.collection('users').doc(userKey).valueChanges();
  }

  getUsers(){
    return this.db.collection('users').snapshotChanges();
  }
}