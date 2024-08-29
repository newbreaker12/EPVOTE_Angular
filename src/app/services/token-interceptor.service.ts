import {Injectable} from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  HttpEvent,
  HttpRequest,
  HttpHandler, HttpInterceptor,
} from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
      private authService: AuthService
  ) {}

  intercept(
      request: HttpRequest<any>,
      next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
        !request.headers.has('Authorization') &&
        !request.url.includes('login')
    ) {
      const userToken = this.authService.getStoredAccessToken();
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${userToken}`),
      });
    }
    return next.handle(request).pipe(
        catchError((error) => {
          if (error?.status === 401) {
            this.authService.navigateToLoginPage();
          } else {
            return throwError(error);
          }
        }),
    ) as Observable<HttpEvent<any>>;
  }
}
