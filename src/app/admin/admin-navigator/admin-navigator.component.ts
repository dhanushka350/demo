import { Component, OnInit } from '@angular/core';
import {UserService} from '../../core/service/user.service';
import {LocalStorageService} from 'ngx-webstorage';
declare var $: any;
@Component({
  selector: 'app-admin-navigator',
  templateUrl: './admin-navigator.component.html',
  styleUrls: ['./admin-navigator.component.css']
})
export class AdminNavigatorComponent implements OnInit {
  user: any;
  constructor(private userService: UserService, private localST: LocalStorageService) {
  }

  ngOnInit() {
  }
  logout() {
    $('.ui.basic.modal')
      .modal('show')
    ;
  }

  logoutProceed() {
    this.userService.logout();
  }
}
