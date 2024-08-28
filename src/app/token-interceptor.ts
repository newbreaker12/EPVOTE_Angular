import {
  HttpErrorResponse,
  HttpResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpEvent,
} from "@angular/common/http";
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      !request.headers.has("Authorization") &&
      !request.url.includes("googleapis")
    ) {
      if (!localStorage.getItem("username")) {
        location.href = "/login";
      }
      request = request.clone({
        setHeaders: {
          Authorization: `${localStorage.getItem("username")}:${localStorage.getItem("password")}`,
        },
      });
    }

    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // Successful response handling (if needed)
          }
        },
        (error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.toastr.error('Unauthorized');
          } else if (error.status === 403) {
            this.toastr.error('Forbidden');
          } else if (error.status === 500) {
            this.toastr.error('Server error');
          } else {
            this.toastr.error('An unexpected error occurred');
          }
        }
      )
    );
  }
}
