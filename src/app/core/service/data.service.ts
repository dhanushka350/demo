import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  public login(conf: any, data: any): Observable<any> {
    return this.requestLogin(conf.url, data).pipe(
      map((t: any) => {
        return t;
      })
      , catchError(error => {
        console.log(error)
        return throwError('Login Failed!')
      }));
  }

  public saveDetails(conf: any, data: any): Observable<any> {
    return this.saveUserDetails(conf.url, data).pipe(
      map((t: any) => {
        return t;
      }),
      catchError(error => {
        console.log(error);
        return throwError("Registration Failed!");
      })
    )
  }

  private requestLogin(url: string, data: any): Observable<any> {
    let body = new FormData();
    let headers = new HttpHeaders();

    headers = headers.append('content-type', 'application/json');
    body.append('usernameOrEmail', data.username);
    body.append('password', data.password);
    return this.http.post(url, body);
  }

  private saveUserDetails(url: string, data: any): Observable<any> {
    let body = new FormData();
    body.append("name", data.name);
    body.append("email", data.email);
    body.append("mobile", data.mobile);
    body.append("address", data.address);
    body.append("company", data.company);
    body.append("password", data.password);
    return this.http.post(url, body);
  }
}
