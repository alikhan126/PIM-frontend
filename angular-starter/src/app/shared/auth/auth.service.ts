import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../constants/app-config';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable()
export class AuthService {
  token: string;

  constructor(private http: HttpClient,private router :Router) {}

  signupUser(postObj:any) {
    return this.http.post<any>(`${AppConfig.URL_SignUp}`, postObj).pipe(
      map(user => {
        if (user && user.email )
       {
          // localStorage.setItem('currentUser', JSON.stringify(user));
          // this.token=user.token;
          // this.router.navigate(['/products']);

          // this.currentUserSubject.next(user);        
          // this.ts.success("Logged In Successfully",'' ,{timeOut: 1000});
          // this.isLoggedIn = true;
        }
        else {
          console.log("Failed to Login")
          // this.ts.error("Failed to Logged In",'' ,{timeOut: 1000});
        }
        return user;
      }),
      catchError(this.handleError<any>('add'))
    );
    //your code for signing up the new user
  }

  signinUser(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${AppConfig.URL_SignIn}`, {email:email,password:password}).pipe(
      map(user => {
        if (user && user.token )
       {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.token=user.token;
          this.router.navigate(['/products']);

          // this.currentUserSubject.next(user);        
          // this.ts.success("Logged In Successfully",'' ,{timeOut: 1000});
          // this.isLoggedIn = true;
        }
        else {
          alert("Failed to Login")
          // this.ts.error("Failed to Logged In",'' ,{timeOut: 1000});
        }
        return user;
      }),
      tap((newP: any) => console.log(`added record w/ id=${newP}`)),
      catchError(this.handleError<any>('add'))
    );
    //your code for checking credentials and getting tokens for for signing in user
  }


  logout() {   
    this.token = null;
    localStorage.removeItem("currentUser");
    this.router.navigate(['auth/login']);
  }

  getToken() {
    if(this.token){
      return this.token;
    }    
    else  {
      let userObj=JSON.parse(localStorage.getItem('currentUser'));
      if(userObj && userObj.token){
        this.token=userObj.token;
        return this.token;
      }
      else {
        return null;
      }
    }
  }

  isAuthenticated() {
    if(this.getToken()){
      return true
    }
    else {
      return false;
    }
    // here you can check if user is authenticated or not through his token 
    // return true;
  }



  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      // alert(error);
      console.log(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);
      // this.ts.error("Failed to Perform Operation");
      // // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  
  /** Log a  message with the MessageService */
  private log(message: string) {
    //  alert(message)
      console.log(message)
    // this.ts.success("Operation Performed Successfully");
    // this.messageService.add(`DealerService: ${message}`);
  }
}
