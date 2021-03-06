import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/services/user.service';
import { AuthService } from '../core/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup} from '@angular/forms';
import { FirebaseUserModel } from '../core/models/user.model';
import { FirebaseService } from '../core/services/firebase.service';

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit{

  user: FirebaseUserModel = new FirebaseUserModel();
  profileForm: FormGroup;
  private _discussions: boolean;
  private _home: boolean;

  get home(): boolean {
    return this._home;
  }

  get discussions(): boolean {
    return this._discussions;
  }

  constructor(
    public userService: UserService,
    public authService: AuthService,
    public firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private location : Location,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
      }
    });

    this._home = true;
  }

  logout(){
    this.authService.doLogout()
    .then((res) => {
      this.location.back();
    }, (error) => {
      console.log("Logout error", error);
    });
  }

  public goHome(): void{
    this._home = true;
    this._discussions = false;
  }
  
  public showDiscussions(): void{
    this._discussions = true;
    this._home = false;
  }
}
