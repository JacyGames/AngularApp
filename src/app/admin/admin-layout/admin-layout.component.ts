import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(public router: Router, public auth: AuthService) { }

  ngOnInit(): void {
  }

  redirect() {
    this.auth.logOut();
    this.router.navigate(['/']);
  }
}
