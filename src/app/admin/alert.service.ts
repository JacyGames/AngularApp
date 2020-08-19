import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

export type Type = 'success' | 'info' | 'danger';

export interface Alert {
  type: Type,
  text: string
}

@Injectable()
export class AlertService {
  message$: Subject<Alert> = new Subject<Alert>()

  success(text: string): void{
    this.message$.next({text, type: 'success'});
  }
  info(text: string): void{
    this.message$.next({text, type: 'info'});
  }
  danger(text: string): void{
    this.message$.next({text, type: 'danger'});
  }

}
