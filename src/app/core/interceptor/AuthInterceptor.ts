import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AlertService} from '../service/alert.service';
import {LocalStorageService} from 'ngx-webstorage';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private localST: LocalStorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.localST.retrieve('ACCESS_TOKEN');

    if (!token) {
      return next.handle(req);
    }

    const req1 = req.clone({
      setHeaders: {
        authorization: `Bearer ${token}`
    }});
    return next.handle(req1);
  }

}
