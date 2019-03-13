import {Component, OnInit} from '@angular/core';
import {UserService} from '../../core/service/user.service';
import {LocalStorageService} from 'ngx-webstorage';

declare var $: any;

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {

  user: any;

  constructor(private userService: UserService, private localST: LocalStorageService) {
  }

  ngOnInit() {
    this.user = '    ' + this.localST.retrieve('USER_NAME');
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
