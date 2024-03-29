import { HttpErrorResponse, HttpResponse, HttpHandler, HttpInterceptor, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class TokenInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!request.headers.has("Authorization") && !request.url.includes("googleapis")) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${localStorage.getItem("username")+':'+localStorage.getItem("password")}`
                }
            });
        }

        return next.handle(request).pipe(tap(
            (event: HttpEvent<any>) => event instanceof HttpResponse,
            (error: HttpErrorResponse) => {
                if (error.status === 401) {
                  localStorage.clear();
                  location.href = '/login';
                }7
            }
        ));
    }
}
