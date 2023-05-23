import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { UsersService } from '../services/users.service';
@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

  constructor(private authService: UsersService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> { 
    const token = this.authService.getToken();

    if (token) {
      // If we have a token, we set it to the header
      request = request.clone({
         setHeaders: {Authorization: `Authorization token ${token}`}
      });
   }
 
    return next.handle(request).pipe(
  	catchError((err) => {
   	 if (err instanceof HttpErrorResponse) {
       	 if (err.status === 401) {
       	 // redirect user to the logout page
         
     	}
 	 }

  	return throwError(() => err);
	})
   )
    ;
  }
}
