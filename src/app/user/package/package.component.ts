import {Component, OnInit} from '@angular/core';
import {SETTINGS} from '../../core/settings/common.settings';
import {AdvertisementService} from '../../core/service/advertisement.service';
import {FileUploader} from 'ng2-file-upload';
import {AlertService} from '../../core/service/alert.service';
import {isEmpty} from 'rxjs-compat/operator/isEmpty';
import {isNegativeNumberLiteral} from 'tslint';

const URL = SETTINGS.ENDPOINTS.uploadMediaFiles.url;

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})

export class PackageComponent implements OnInit {

  advertisements: any;
  packages: any;
  img1: any;
  id: any;
  name: any;
  price: any;
  desc: any;
  selectedAd: any;

  constructor(private advertisementService: AdvertisementService, private alertService: AlertService) {
  }

  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'file'});

  ngOnInit() {
    this.getAdvertisementList();
    this.default();
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.img1 = response;
    };
  }


  getAdvertisementList() {
    this.advertisementService.loadAdvertisements(SETTINGS.ENDPOINTS.userAdvertisements.url).subscribe(data => {
      this.advertisements = data;
    });
  }

  setPackages(advertisement) {
    this.selectedAd = advertisement.id;
    this.packages = advertisement.packages;
    this.alertService.showInfo('Changed to ' + advertisement.title);
  }

  getselectedPack(pack) {
    console.log(pack);
    this.id = pack.id;
    this.name = pack.name;
    this.price = pack.price;
    this.desc = pack.descriptin;
    this.img1 = pack.image;
  }

  submitPackage(form) {
    if (form.ad.length < 1) {
      this.alertService.showWarning('Please select an advertisement.');
    } else {
      this.advertisementService.savePackage(SETTINGS.ENDPOINTS.savePackages, form).subscribe(data => {
        this.alertService.showSuccess(data.message);
        this.alertService.showInfo('Refresh the page to retrieve new updates.');
        this.default();
      });
    }
  }

  default() {
    this.id = '';
    this.name = '';
    this.price = '';
    this.desc = '';
    this.img1 = 'http://localhost:7575/api/gallery/downloadFile/7d079ed8-0a3d-4b27-91c3-f3963223c5c8';

  }
}
