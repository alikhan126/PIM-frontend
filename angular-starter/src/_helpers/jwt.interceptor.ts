import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

// import { AuthService } from '../services/auth.service';
import { AuthService } from '../app/shared/auth/auth.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        console.log("added auth")
        // let currentUser = true;
        let currentUser = this.authenticationService.isAuthenticated();
        let token = this.authenticationService.getToken();

        if (request.url != "http://foodservicedirect.com.s3.amazonaws.com/"){
            if (currentUser && currentUser) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `jwt ${token}`
                    }
                });
            }
        }

        return next.handle(request);
    }
}