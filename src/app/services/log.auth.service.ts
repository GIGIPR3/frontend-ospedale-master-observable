import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class LogAuthService {
  constructor(private cookieService: CookieService) {
    this.updateService()
   }

  id: number = -1;
  role: string = '';

  

  updateCookies() {
    this.cookieService.deleteAll();
    if (this.id != -1) {
      this.cookieService.set('id', this.id?.toString());
    }
    if (this.role != '') {
      this.cookieService.set('role', this.role);
    }
  }

  updateService() {
    if (this.cookieService.get('role') != null) {
      this.role = this.cookieService.get('role');
    }
    if (this.cookieService.get('id') != null) {
      this.id = parseInt(this.cookieService.get('id'));
    }
  }

  hasRole(role: string) {
    return this.role == role;
  }
}
