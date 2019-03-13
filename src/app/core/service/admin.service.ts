import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {SETTINGS} from '../settings/common.settings';
import {catchError, map} from 'rxjs/operators';
import {AlertService} from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private alertService: AlertService) {
  }


  public getUsers(page: any): Observable<any> {
    return this.loadUsers(page).pipe(
      map((t: any) => {
        return t;
      }),
      catchError(error => {
        if (error.error.error === 'Bad Request') {
          error.error.errors.forEach((element) => {
            this.alertService.showError(element.field + ' ' + element.defaultMessage);
          });
        }
        this.alertService.showError(error.error.message);
        return throwError('Data Retrieve Failure..!');
      })
    );
  }

  public getAdvertisements(condition: any, page: any): Observable<any> {
    return this.loadAdvertisements(condition, page).pipe(
      map((t: any) => {
        return t;
      }),
      catchError(error => {
        if (error.error.error === 'Bad Request') {
          error.error.errors.forEach((element) => {
            this.alertService.showError(element.field + ' ' + element.defaultMessage);
          });
        }
        this.alertService.showError(error.error.message);
        return throwError('Data Retrieve Failure..!');
      })
    );
  }


  loadUsers(page: any): Observable<any> {
    const params = new HttpParams().set('pageable', page);
    return this.http.get(SETTINGS.ENDPOINTS.getUserList.url, {params});
  }

  loadAdvertisements(condition: any, page: any): Observable<any> {
    const params = new HttpParams().set('pageable', page).set('condition', condition);
    return this.http.get(SETTINGS.ENDPOINTS.getAdvertisements.url, {params});
  }
}
