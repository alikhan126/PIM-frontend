import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {NGXToastrService} from "../app/shared/services/toastr.service"
import { AuthService } from '../app/shared/auth/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService,public toastService: NGXToastrService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            // this.toastService.typeError();
            if (err.status === 401) {
                this.authenticationService.logout();
                
                // location.reload(true);
            }
            else if(err && err.status == 400 && err.error
            ){
                //show error messages 
                Object.keys(err.error).forEach(eKey=>{
                    this.toastService.typeError(eKey,err.error[eKey][0]);
                })
            }
            else if(err && err.status == 500 ){
                this.toastService.typeError('Server Error',"Internal Server Error")
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}