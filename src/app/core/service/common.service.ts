import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {SETTINGS} from '../settings/common.settings';
import {catchError, map} from 'rxjs/operators';
import {AlertService} from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient, private alertService: AlertService) {
  }

  public loadCities(): Observable<any> {
    return this.loadCityList().pipe(
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

  public loadCategories(): Observable<any> {
    return this.loadCategoryList().pipe(
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

  private loadCityList(): Observable<any> {
    return this.http.get(SETTINGS.ENDPOINTS.getCityList.url);
  }

  private loadCategoryList(): Observable<any> {
    return this.http.get(SETTINGS.ENDPOINTS.getCategoryList.url);
  }
}
