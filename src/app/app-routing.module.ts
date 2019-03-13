import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {UserHomeComponent} from './user/user-home/user-home.component';
import {UserComponent} from './user/user/user.component';
import {AdvertisementComponent} from './user/advertisement/advertisement.component';
import {PackageComponent} from './user/package/package.component';
import {AdminHomeComponent} from './admin/admin-home/admin-home.component';
import {AdminComponent} from './admin/admin/admin.component';
import {AdvertisementsComponent} from './admin/advertisements/advertisements.component';

const routes: Routes = [
  {
    path: 'user-dashboard', component: UserHomeComponent, children: [
      {path: 'account', component: UserComponent},
      {path: 'advertisements', component: AdvertisementComponent},
      {path: 'packages', component: PackageComponent}
    ]
  },
  {
    path: 'admin', component: AdminHomeComponent, children: [
      {path: 'accounts', component: AdminComponent},
      {path: 'manage-advertisements', component: AdvertisementsComponent}
    ]
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'sign-in',
    component: LoginComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {path: '**', redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
