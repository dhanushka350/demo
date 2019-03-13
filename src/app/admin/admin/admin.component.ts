import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../core/service/admin.service';
import {LocalStorageService} from "ngx-webstorage";

declare var $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  name: string;
  contact: string;
  email: string;
  company: string;
  address: string;

  list: any;
  page = 1;

  logged: string;

  constructor(private adminService: AdminService, private localST: LocalStorageService) {
  }

  setPage(direction) {
    if (direction === 'NEXT') {
      this.page--;
    } else if (direction === 'BACK') {
      this.page++;
    }
    this.getUserList();
  }

  getUserList() {
    this.adminService.getUsers(this.page).subscribe(data => {
      this.list = data;
      console.log(data);
    });
  }

  updateUser(user) {
    this.name = user.name;
    this.contact = user.mobile;
    this.email = user.email;
    this.company = user.company;
    this.address = user.address;
  }

  block() {
    $('.ui.basic.modal.block')
      .modal('show');
  }

  developer() {
    $('.ui.basic.modal.dev')
      .modal('show');
  }

  ngOnInit() {
    this.getUserList();
    this.logged = this.localST.retrieve('USER_NAME');
  }


}
