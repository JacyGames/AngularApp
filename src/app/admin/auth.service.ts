import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {FbAuthResponse, User} from "../common/interfaces";
import {Observable, Subject, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {catchError, tap} from "rxjs/operators";

@Injectable()
export class AuthService {

  errorObs$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  get token() {
    const expires = new Date(localStorage.getItem('fb-expires'));
    if(new Date() > expires){
      this.logOut();
      return null;
    }else{
      return localStorage.getItem('fb-token')
    }

  }
  login(user: User): Observable<any>{
    user.returnSecureToken = true;
   return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
     .pipe(
       tap(this.setToken),
       catchError(this.handleError.bind(this))
     )
  }
  logOut(): void{
    this.setToken(null);
  }
  isAuth(): boolean{
    return !!this.token;
  }
  private handleError(error: HttpErrorResponse): Observable<any>{

    const {message} = error.error.error;
    switch (message){
      case 'EMAIL_NOT_FOUND':
        this.errorObs$.next('Email does not exist');
        break
      case 'INVALID_PASSWORD':
        this.errorObs$.next('Password is incorrect');
          break
      default:  this.errorObs$.next('This error is not typical, please try again');
    }

    return throwError(error)
  }

  private setToken(response: FbAuthResponse | null){
    if(response) {
      const expires = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-expires', expires.toString());
      localStorage.setItem('fb-token', response.idToken);
    }else {
      localStorage.clear();
    }

  }
}
