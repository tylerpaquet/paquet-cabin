export class FirebaseUserModel {
  name: string;
  email: string;
  uid: string;
  firstName: string;
  lastName: string;
  displayName: string;

  constructor(){
    this.name = "";
    this.email = "";
    this.uid = "";
    this.firstName = "";
    this.lastName = "";
    this.displayName = "";
  }
}
