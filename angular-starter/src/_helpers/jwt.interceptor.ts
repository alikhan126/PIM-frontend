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
        let currentUser = true;

        // let currentUser = this.authenticationService.isAuthenticated();
        let token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0LCJ1c2VybmFtZSI6InRlc3QyQGdtYWlsLmNvbSIsImV4cCI6MTU2ODQ5ODI0NSwiZW1haWwiOiJ0ZXN0MkBnbWFpbC5jb20ifQ.hRMIX890WHi4NUb4iD-UvpEJEj9uVQ3APpFmfyaEoLs";
        
        if (currentUser && currentUser) {
            request = request.clone({
                setHeaders: {
                    Authorization: `jwt ${token}`
                }
            });
        }

        return next.handle(request);
    }
}