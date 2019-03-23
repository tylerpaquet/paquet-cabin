import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { UserService } from '../core/services/user.service';
import { FirebaseUserModel } from '../core/models/user.model';
import { FirebaseService } from '../core/services/firebase.service';

@Injectable()
export class UserResolver implements Resolve<FirebaseUserModel> {

  constructor(public userService: UserService, public fireBaseService: FirebaseService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot) : Promise<FirebaseUserModel> {

    let user = new FirebaseUserModel();

    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
      .then(res => {
        if(res.providerData[0].providerId == 'password'){
          user.name = res.displayName;
          user.email = res.email;
          user.uid = res.uid;
          this.fireBaseService.getUser(res.uid).subscribe((x: FirebaseUserModel) => {
            user.firstName = x.firstName;
            user.lastName = x.lastName;
            user.displayName = x.displayName;
          });

          return resolve(user);
        }
      }, err => {
        this.router.navigate(['/login']);
        return reject(err);
      })
    })
  }
}
