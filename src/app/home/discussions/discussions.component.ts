import { Component, OnInit, Input } from '@angular/core';
import { FirebaseUserModel } from '../../core/models/user.model';
import { FirebaseDiscussionTopicModel } from '../../core/models/discussion-topic.model';
import { FirebaseService } from '../../core/services/firebase.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'discussions',
  templateUrl: './discussions.component.html',
  styleUrls: ['./discussions.component.scss']
})
export class DiscussionsComponent implements OnInit {

@Input() user: FirebaseUserModel = new FirebaseUserModel();
public discussionTopics: Array<FirebaseDiscussionTopicModel>;
public showAddTopicForm: boolean;
public newTopic: FormGroup;

  constructor(
    public firebaseService: FirebaseService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.discussionTopics = new Array<FirebaseDiscussionTopicModel>();
    this.showAddTopicForm = false;

    // get discussion topics from the database
    this.firebaseService.getDiscussionTopics().subscribe(x => {
      // get each ID to retrieve the individual records
      x.forEach(element => {
        let topicId: string;
        topicId = element.payload.doc.id;

        //retrieve inidivudal topics
        this.firebaseService.getDiscussionTopic(topicId).subscribe((topic: FirebaseDiscussionTopicModel) => {
          topic.topicId = topicId;

          // add topic to array if it doesn't exist or update it if it does
          if(!this.discussionTopics.find((record: FirebaseDiscussionTopicModel) => record.topicId === topic.topicId)) {
            this.discussionTopics.push(topic);
          }
          else {
            let recordToChange = this.discussionTopics[this.indexOfWithAttr(this.discussionTopics, 'topicId', topic.topicId)];
            recordToChange.name = topic.name;
            recordToChange.topicId = topic.topicId;
            recordToChange.userId = topic.userId;
          }
        });
      });
    });
  }

  // used to find idex of topic in discussionTopics array. Used to update existing record
  public indexOfWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
  }

  // called on the click event of the Add Topic button
  public addTopic(): void {
    this.newTopic = this.fb.group({
      name: ['', []],
      userId: [this.user.uid, []]
    });
    this.showAddTopicForm = true;
  }

  // called when the submit button is clicked to add a new topic
  public saveTopic(topicToAdd: FirebaseDiscussionTopicModel): void {
    this.firebaseService.createTopic(topicToAdd);
    this.showAddTopicForm = false;
  }

  // called when cancel button is clicked when creating a new topic
  public cancel(): void {
    this.showAddTopicForm = false;
  }

}