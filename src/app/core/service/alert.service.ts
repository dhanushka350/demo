import {Injectable} from '@angular/core';
import {ToastrManager} from 'ng6-toastr-notifications';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(public toastr: ToastrManager) {
  }

  showSuccess(message) {
    this.toastr.successToastr(message, 'Success!');
  }

  showError(message) {
    this.toastr.errorToastr(message, 'Oops!');
  }

  showCustomeError(message, title) {
    this.toastr.errorToastr(message, title);
  }

  showWarning(message) {
    this.toastr.warningToastr(message, 'Alert!');
  }

  showInfo(message) {
    this.toastr.infoToastr(message, 'Info');
  }

  showCustom() {
    this.toastr.customToastr('Custom Toast', null, {enableHTML: true});
  }

}
