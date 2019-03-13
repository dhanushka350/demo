import {Component, OnInit} from '@angular/core';
import {UserService} from '../../core/service/user.service';
import {HttpHeaders} from '@angular/common/http';
import {SETTINGS} from '../../core/settings/common.settings';
import {DataService} from '../../core/service/data.service';
import {AlertService} from '../../core/service/alert.service';

declare var $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})


export class UserComponent implements OnInit {
  name: string;
  contact: string;
  email: string;
  company: string;
  address: string;

  constructor(private userService: UserService, private dataService: DataService,
              private alertService: AlertService) {
    this.getUserDetails();
  }

  ngOnInit() {
  }

  submitData() {
    $('.ui.basic.modal')
      .modal('show')
    ;
  }

  getUserDetails() {
    this.userService.getForUpdate().subscribe(data => {
      console.log(data);
      this.name = data.name;
      this.contact = data.mobile;
      this.email = data.email;
      this.company = data.company;
      this.address = data.address;
    });
  }

  updateAccount(user) {
    this.dataService.update(SETTINGS.ENDPOINTS.updateUserDetails, user).subscribe(data => {
      console.log(data);
      this.alertService.showSuccess(data.message);
    });
  }
}
