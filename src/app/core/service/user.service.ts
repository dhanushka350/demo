import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {DataService} from './data.service';
import {SETTINGS} from '../settings/common.settings';
import {Router} from '@angular/router';
import {LocalStorage, LocalStorageService} from 'ngx-webstorage';
import {extractStyleParams} from '@angular/animations/browser/src/util';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {AlertService} from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  @LocalStorage('USER_ID')
  private currentUserID: any;
  @LocalStorage('USER_ROLE')
  private userRole: any;
  @LocalStorage('USER_EMAIL')
  private privileges: any;
  @LocalStorage('USER_NAME')
  private currentUser: any;

  constructor(private dataService: DataService, private router: Router,
              private localSt: LocalStorageService, private http: HttpClient,
              private alertService: AlertService, private localST: LocalStorageService) {
  }


  private redirectUser() {

  }

  public setUserID(userID) {
    this.currentUserID.next(userID);
  }

  public setUserRole(userRole) {
    this.userRole = userRole;

  }

  public getUserRole() {
    return this.userRole;
  }

  public setPrivileges(privilages) {
    this.privileges = privilages;
  }

  public getPrivileges() {
    return this.privileges;
  }

  public getUserID(): Observable<number> {
    return this.currentUserID.asObservable();
  }

  public clearUserDetails() {
    this.userRole = null;
    this.currentUserID.next(null);
    this.privileges = null;
  }

  logout() {
    this.localSt.store('ACCESS_TOKEN', null);
    this.router.navigateByUrl('/login');
  }

  getUserDetails(email) {
    this.loadUserData(email).subscribe(
      data => {
        if (data.role === 'ROLE_USER') {
          this.router.navigateByUrl('/user-dashboard');
        } else if (data.role === 'ROLE_ADMIN') {
          this.router.navigateByUrl('/admin');
          this.alertService.showInfo('Logged in as a admin');
        }
        this.localSt.store('USER_ID', data.id);
        this.localSt.store('USER_ROLE', data.role);
        this.localSt.store('USER_EMAIL', data.email);
        this.localSt.store('USER_NAME', data.name);
      }
    );
  }


  public getForUpdate(): Observable<any> {
    const email = this.localST.retrieve('USER_EMAIL');
    return this.loadUserData(email).pipe(
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

  loadUserData(email: any): Observable<any> {
    const params = new HttpParams().set('email', email);
    return this.http.get(SETTINGS.ENDPOINTS.getUser.url, {params});
  }
}
