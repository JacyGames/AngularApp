import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../common/interfaces";
import {AuthService} from "../auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup
  submitted = false
  message = ''
  constructor(public auth: AuthService, private route: Router, private road: ActivatedRoute) { }
  ngOnInit(): void {
    this.road.queryParams.subscribe((params : Params) => {
      if(params['Authorized']) {
        this.message = 'Please, log in'
      }if(params['SessionPassed']){
        this.message = 'Your session is passed, please log in again'
      }
    })
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(7)])
    })
  }

  submit(): void{
    if(this.form.invalid){
      return;
    }
    this.submitted = true;
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }
    this.auth.login(user).subscribe((response) => {
      this.submitted = false;
      this.route.navigate(['/admin','dashboard']);
    },() => {
      this.submitted = false;
    })


  }
}
