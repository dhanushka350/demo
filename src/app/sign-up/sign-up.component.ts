import {Component, OnInit} from '@angular/core';
import {DataService} from "../core/service/data.service";
import {SETTINGS} from "../core/settings/common.settings";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
  }

  login(user) {

    if (user.password === user.password2) {
      this.dataService.saveDetails(SETTINGS.ENDPOINTS.saveUser, user).subscribe(data => {
        alert("ok");
      });
    } else {
      alert("pass not match");
    }
  }


}
