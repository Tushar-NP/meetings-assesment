import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { ServiceService } from './service.service';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {
  constructor(private service: ServiceService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (
      localStorage.getItem('token') &&
      localStorage.getItem('token') != 'undefiend'
    ) {
      let token = localStorage.getItem('token');

      let register = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          accept: '*/*',
          authorization: `Bearer ${token}`,
        },
      });
      return next.handle(register);
    } else {
      let register = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          accept: '*/*',
        },
      });
      return next.handle(register);
    }
  }
}
