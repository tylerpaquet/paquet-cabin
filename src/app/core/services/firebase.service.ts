import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { TouchSequence } from 'selenium-webdriver';

@Injectable()
export class FirebaseService {

  constructor(public db: AngularFirestore) {}

  getUser(userKey){
    return this.db.collection('users').doc(userKey).valueChanges();
  }

  getUsers(){
    return this.db.collection('users').snapshotChanges();
  }

  getDiscussionTopics(){
    return this.db.collection('discussionTopic').snapshotChanges();
  }

  getDiscussionTopic(discussionTopicKey){
    return this.db.collection('discussionTopic').doc(discussionTopicKey).valueChanges();
  }

  getdiscussionTopicComments(){
    return this.db.collection('discussionTopicComment').snapshotChanges();
  }

  getDiscussionTopicComment(discussionTopicCommentKey){
    return this.db.collection('discussionTopicComment').doc(discussionTopicCommentKey).valueChanges();
  }

  createTopic(topic){
    return this.db.collection('discussionTopic').add(topic);
}
}