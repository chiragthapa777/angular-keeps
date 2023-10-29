import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the token from your authentication service or wherever you store it
    const token = localStorage.getItem('token');

    // Clone the request and add the Authorization header with the token
    const authReq = request.clone({
      setHeaders: {
        token: `${token}`
      }
    });

    return next.handle(authReq)
      .pipe(
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // Request was successful; you can handle success cases here
          }
        }),
        catchError((error: any) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              // Unauthorized, redirect to login or error page
              this.router.navigate(['/auth']); // Adjust the route as needed
            }
          }
          throw error;
        })
      );
  }
}
