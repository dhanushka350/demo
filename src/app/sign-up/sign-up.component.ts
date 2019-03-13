import {Component, OnInit} from '@angular/core';
import {DataService} from '../core/service/data.service';
import {SETTINGS} from '../core/settings/common.settings';
import {AlertService} from '../core/service/alert.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private dataService: DataService, private alert: AlertService,
              private router: Router) {
  }

  ngOnInit() {
  }

  login(user) {

    if (user.password === user.password2) {
      this.dataService.saveDetails(SETTINGS.ENDPOINTS.saveUser, user).subscribe(data => {
        this.alert.showSuccess('Your account has been successfully created.');
        setTimeout(() => {
          this.router.navigateByUrl('/sign-in');
        }, 200);
      });
    } else {
      this.alert.showWarning('Your password and confirmation password do not match. [******] - has been ignored.');
    }
  }


}
