import {Component, OnInit} from '@angular/core';
import {DataService} from '../core/service/data.service';
import {SETTINGS} from '../core/settings/common.settings';
import {UserService} from '../core/service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private dataService: DataService, private router: Router,
              private userService: UserService) {
  }

  ngOnInit() {
  }

  login(user) {
    this.dataService.login(SETTINGS.ENDPOINTS.userLogin, user).subscribe(data => {
      this.userService.getUserDetails(user.username);
    });
  }
}
