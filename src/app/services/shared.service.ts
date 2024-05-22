import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  userDevice: string = '';
  userIP: string = '';
  private toastSubject = new Subject<any>();

  constructor(private http: HttpClient) {}

  getUserDevice() {
    const userAgent = window.navigator.userAgent;
    const device = /Mobile/.test(userAgent) ? 'Mobile' : 'Desktop';
    this.userDevice = device;
  }

  getUserIP() {
    this.http.get('https://api.ipify.org/?format=json').subscribe(
      (res: any) => {
        this.userIP = res.ip;
      },
      (err) => {
        this.userIP = 'Error IP ' + err;
      }
    );
  }

  showToast(message: string, classToast: string = ''): void {
    this.toastSubject.next({ message, classToast });
  }
  
  onToast(): Subject<any> {
    return this.toastSubject;
  }
}
