import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service'
import { Router, Params } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'page-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.scss']
})
export class LoginComponent implements OnInit{

  login: FormGroup;
  errorMessage: string = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(){
    this.login = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  tryLogin(value){
    this.authService.doLogin(value)
    .then(res => {
      this.router.navigate(['/home']);
      this.errorMessage = '';
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    })
  }
}
