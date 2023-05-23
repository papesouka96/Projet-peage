

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler,HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})

export class JwtInterceptorService implements HttpInterceptor {

  constructor(private auth: UsersService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    let currentUser = this.auth.currentUserValue;
    console.log(currentUser);
        if (currentUser ) {
            req = req.clone({
             
                 setHeaders: {
                    Authorization: `Bearer ${currentUser}`
                } 
            });console.log('headers:', req.headers);
            
        }
            
        return next.handle(req).pipe(catchError(err => {
            const error = err.error.message || err.statusText;
            return throwError(() => error);
        }))
 
  }
}