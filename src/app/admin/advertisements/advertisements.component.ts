import {Component, OnInit} from '@angular/core';
import {AdvertisementService} from '../../core/service/advertisement.service';
import {AdminService} from '../../core/service/admin.service';

@Component({
  selector: 'app-advertisements',
  templateUrl: './advertisements.component.html',
  styleUrls: ['./advertisements.component.css']
})
export class AdvertisementsComponent implements OnInit {

  page = 0;
  list: any;

  id: any;
  title: any;
  city: any;
  category: any;
  openingdays: any;
  openingHours: any;
  website: any;
  created: any;
  expire: any;
  map: any;
  description: any;

  img1: any;
  img2: any;
  img3: any;
  img4: any;

  constructor(private adminService: AdminService) {
  }

  ngOnInit() {
    this.fillTable(0);
    this.default();
  }

  fillTable(condition) {
    this.adminService.loadAdvertisements(condition, this.page).subscribe(data => {
      this.list = data;
    });
  }

  getselectedAd(element) {
    this.id = element.id;
    this.title = element.title;
    this.city = element.city;
    this.category = element.category;
    this.openingdays = element.openingDates;
    this.openingHours = element.openingHours;
    this.website = element.website;
    this.created = element.created;
    this.expire = element.expired;
    this.description = element.description;
    this.img1 = element.img1;
    this.img2 = element.img2;
    this.img3 = element.img3;
    this.img4 = element.img4;
  }

  default() {
    this.id = '';
    this.title = '';
    this.city = '';
    this.category = '';
    this.openingdays = '';
    this.openingHours = '';
    this.website = '';
    this.created = '';
    this.expire = '';
    this.description = '';
    this.img1 = 'http://localhost:7575/api/gallery/downloadFile/7d079ed8-0a3d-4b27-91c3-f3963223c5c8';
    this.img2 = 'http://localhost:7575/api/gallery/downloadFile/7d079ed8-0a3d-4b27-91c3-f3963223c5c8';
    this.img3 = 'http://localhost:7575/api/gallery/downloadFile/7d079ed8-0a3d-4b27-91c3-f3963223c5c8';
    this.img4 = 'http://localhost:7575/api/gallery/downloadFile/7d079ed8-0a3d-4b27-91c3-f3963223c5c8';
  }
}
