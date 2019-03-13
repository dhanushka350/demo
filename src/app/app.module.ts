import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {ToastrModule} from 'ng6-toastr-notifications';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DataService} from './core/service/data.service';
import {AlertService} from './core/service/alert.service';
import {UserService} from './core/service/user.service';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {NavigatorComponent} from './user/navigator/navigator.component';
import {UserComponent} from './user/user/user.component';
import {UserHomeComponent} from './user/user-home/user-home.component';
import {AuthInterceptor} from './core/interceptor/AuthInterceptor';
import {AdvertisementComponent} from './user/advertisement/advertisement.component';
import {CommonService} from './core/service/common.service';
import {AdvertisementService} from './core/service/advertisement.service';
import {FileSelectDirective} from 'ng2-file-upload';
import {PackageComponent} from './user/package/package.component';
import {AdminComponent} from './admin/admin/admin.component';
import {AdminHomeComponent} from './admin/admin-home/admin-home.component';
import {AdminNavigatorComponent} from './admin/admin-navigator/admin-navigator.component';
import {AdminService} from './core/service/admin.service';
import { AdvertisementsComponent } from './admin/advertisements/advertisements.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    NavigatorComponent,
    UserComponent,
    UserHomeComponent,
    AdvertisementComponent,
    FileSelectDirective,
    PackageComponent,
    AdminComponent,
    AdminHomeComponent,
    AdminNavigatorComponent,
    AdvertisementsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxWebstorageModule.forRoot(),
    ToastrModule.forRoot()
  ],
  providers: [DataService, AlertService, AdminService, UserService, CommonService, AdvertisementService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
