import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AlertService} from "../../admin/alert.service";


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  @Input() delay = 5000
  text = ''
  type = 'success'
  subscription: Subscription

  constructor(private alert: AlertService) { }

  ngOnInit(): void {
    this.subscription = this.alert.message$.subscribe( (alerter) => {
      this.type = alerter.type;
      this.text = alerter.text;
      const timeout = setTimeout(() => {
        this.text = '';
        clearTimeout(timeout);
      },this.delay);

    })
  }

  ngOnDestroy() {

    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

}
