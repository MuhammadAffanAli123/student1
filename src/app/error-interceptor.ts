import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {MatDialog} from '@angular/material';
import {Injectable} from '@angular/core';
import {ErrorComponent} from './error/error.component';

@Injectable() // only needed because we are injecting a service here
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public dialog: MatDialog) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'An unknown error occurred';
          if (error.error.message) {
            errorMessage = error.error.message;
          }

          this.dialog.open(ErrorComponent, {
            data: {
              message: errorMessage
            }
          });

          return throwError(error); // to return an observable to be handled in other services
        })
      );
  }

}
