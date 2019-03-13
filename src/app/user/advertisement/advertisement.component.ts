import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../core/service/common.service';
import {AdvertisementService} from '../../core/service/advertisement.service';
import {SETTINGS} from '../../core/settings/common.settings';
import {AlertService} from '../../core/service/alert.service';
import {LocalStorageService} from 'ngx-webstorage';
import {FileUploader} from 'ng2-file-upload';


declare var $: any;
const URL = SETTINGS.ENDPOINTS.uploadMediaFiles.url;

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.css']
})

export class AdvertisementComponent implements OnInit {

  constructor(private commonService: CommonService, private advertisementService: AdvertisementService,
              private alertService: AlertService, private localST: LocalStorageService) {
  }

  city: any = 'Select City';
  category: any = 'Select Category';
  clist: any;
  catelist: any;
  ads: any;
  edit: any;

  id: any;
  title: any;
  openingdays: any;
  openingHours: any;
  website: any;
  map: any;
  description: any;

  img1: any;
  img2: any;
  img3: any;
  img4: any;
  count: number;
  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'file'});

  ngOnInit() {
    this.getCities();
    this.getCategories();
    this.getAdvertisementList();
    this.default();
    this.description = '';
    this.count = 1;
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      if (this.count === 1) {
        this.img1 = response;
      } else if (this.count === 2) {
        this.img2 = response;
      } else if (this.count === 3) {
        this.img3 = response;
      } else if (this.count === 4) {
        this.img4 = response;
        this.alertService.showInfo('Four Images Collected.');
      }
      this.count++;
    };
  }

  showUploadModal() {
    $('.ui.modal')
      .modal({
        inverted: true
      })
      .modal('show')
    ;
  }

  getCities() {
    this.commonService.loadCities().subscribe(data => {
      this.clist = data;
    });
  }

  getCategories() {
    this.commonService.loadCategories().subscribe(data => {
      this.catelist = data;
    });
  }

  getAdvertisementList() {
    this.advertisementService.loadAdvertisements(SETTINGS.ENDPOINTS.userAdvertisements.url).subscribe(data => {
      this.ads = data;
    });
  }

  submitAdvertisement(form) {
    if (form.category.length < 1) {
      this.alertService.showWarning('Please select a business category');
    } else if (form.city.length < 1) {
      this.alertService.showWarning('Please select a city');
    } else if (form.title.length < 2) {
      this.alertService.showWarning('Please add a meaningful title');
    } else if (form.openingDates.length < 2) {
      this.alertService.showWarning('Working days are very important for your clients');
    } else if (form.description.length < 20) {
      const user = this.localST.retrieve('USER_NAME');
      this.alertService.showWarning('Your describe is very short ' + user + '. Your clients are ' +
        'very interesting to know about your service.');
    } else if (this.count < 5) {
      this.alertService.showWarning('Please select four images');
    } else {
      this.advertisementService.saveAdvertisement(SETTINGS.ENDPOINTS.saveAdvertisement, form).subscribe(data => {
        if (data.success) {
          this.default();
          this.alertService.showSuccess(data.message);
          this.getAdvertisementList();
        } else {
          this.alertService.showError(data.message);
        }
      });
      console.log(form);
    }

  }


  getselectedAd(element) {
    this.id = element.id;
    this.title = element.title;
    this.openingdays = element.openingDates;
    this.openingHours = element.openingHours;
    this.website = element.website;
    this.map = element.map;
    this.description = element.description;
    this.img1 = element.img1;
    this.img2 = element.img2;
    this.img3 = element.img3;
    this.img4 = element.img4;
  }

  default() {
    this.id = '';
    this.title = '';
    this.openingdays = '';
    this.openingHours = '';
    this.website = '';
    this.map = '';
    this.description = '';
    this.img1 = 'http://localhost:7575/api/gallery/downloadFile/7d079ed8-0a3d-4b27-91c3-f3963223c5c8';
    this.img2 = 'http://localhost:7575/api/gallery/downloadFile/7d079ed8-0a3d-4b27-91c3-f3963223c5c8';
    this.img3 = 'http://localhost:7575/api/gallery/downloadFile/7d079ed8-0a3d-4b27-91c3-f3963223c5c8';
    this.img4 = 'http://localhost:7575/api/gallery/downloadFile/7d079ed8-0a3d-4b27-91c3-f3963223c5c8';
  }
}
