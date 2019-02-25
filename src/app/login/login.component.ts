import {Component, OnInit} from '@angular/core';
import {DataService} from "../core/service/data.service";
import {SETTINGS} from "../core/settings/common.settings";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
  }

  login(user) {
    this.dataService.login(SETTINGS.ENDPOINTS.userLogin, user).subscribe(data => {
      alert("ok");
    });
  }
}
