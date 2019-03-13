import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AlertService} from './alert.service';
import {LocalStorageService} from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public accessToken;

  constructor(private http: HttpClient, private alert: AlertService,
              private localST: LocalStorageService) {
  }

  public login(conf: any, data: any): Observable<any> {
    return this.requestLogin(conf.url, data).pipe(
      map((t: any) => {
        this.accessToken = t.accessToken;
        this.localST.store('ACCESS_TOKEN', this.accessToken);
        return t;
      })
      , catchError(error => {
        this.alert.showCustomeError(error.error.message, error.error.error);
        return throwError('Login Failed!');
      }));
  }

  public saveDetails(conf: any, data: any): Observable<any> {
    return this.saveUserDetails(conf.url, data).pipe(
      map((t: any) => {
        return t;
      }),
      catchError(error => {
        if (error.error.error === 'Bad Request') {
          error.error.errors.forEach((element) => {
            this.alert.showError(element.field + ' ' + element.defaultMessage);
          });
        }
        this.alert.showError(error.error.message);
        return throwError('Registration Failed!');
      })
    );
  }

  public update(conf: any, data: any): Observable<any> {
    return this.updateUserDetails(conf.url, data).pipe(
      map((t: any) => {
        return t;
      }),
      catchError(error => {
        console.log(error);
        if (error.error.error === 'Bad Request') {
          error.error.errors.forEach((element) => {
            this.alert.showError(element.field + ' ' + element.defaultMessage);
          });
        }
        this.alert.showError(error.error.message);
        return throwError('Update Failed!');
      })
    );
  }

  private requestLogin(url: string, data: any): Observable<any> {
    const body = new FormData();
    let headers = new HttpHeaders();

    headers = headers.append('content-type', 'application/json');
    body.append('usernameOrEmail', data.username);
    body.append('password', data.password);
    return this.http.post(url, body);
  }

  private saveUserDetails(url: string, data: any): Observable<any> {
    const body = new FormData();
    body.append('name', data.name);
    body.append('email', data.email);
    body.append('mobile', data.mobile);
    body.append('address', data.address);
    body.append('company', data.company);
    body.append('password', data.password);
    return this.http.post(url, body);
  }

  private updateUserDetails(url: string, data: any): Observable<any> {
    const body = new FormData();
    body.append('name', data.name);
    body.append('email', data.email);
    body.append('mobile', data.mobile);
    body.append('address', data.address);
    body.append('company', data.company);
    body.append('password', '00000000');
    return this.http.post(url, body);
  }
}
