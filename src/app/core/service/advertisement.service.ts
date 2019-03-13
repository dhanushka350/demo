import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AlertService} from './alert.service';
import {LocalStorageService} from 'ngx-webstorage';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {

  constructor(private http: HttpClient,
              private alertService: AlertService, private localST: LocalStorageService) {
  }

  public saveAdvertisement(conf: any, data: any): Observable<any> {
    return this.save(conf.url, data).pipe(
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
        return throwError('Advertisement Request Failed!');
      })
    );
  }
  public savePackage(conf: any, data: any): Observable<any> {
    return this.save(conf.url, data).pipe(
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
        return throwError('Package Request Failed!');
      })
    );
  }

  public loadAdvertisements(url: string): Observable<any> {
    return this.loadUserAdvertisements(url).pipe(map((t: any) => {
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

  private loadUserAdvertisements(url: string): Observable<any> {
    return this.http.get(url);
  }

  private save(url: string, data: any): Observable<any> {
    return this.http.post(url, data);
  }
}
