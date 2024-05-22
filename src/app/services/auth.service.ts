import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';
import { DataService } from './data.service';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userToken: any = null;
  userData: any = null;
  expToken: number | any = null;
  
  currentUserLoginOn : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData : BehaviorSubject<any> = new BehaviorSubject<any>({});
  
  constructor(
    private _dataServ: DataService,
    private _http: HttpClient,
    private sharedService: SharedService
  ) {
    //this.getCurrentUser();
  }

  getCurrentUser() {
    const tokentUser = sessionStorage.getItem('AmorePizza');
    const menu = sessionStorage.getItem('AmorePizzaMddenu');
    console.log(menu)
    if (tokentUser) {
      this.userToken = tokentUser;
      this.decodeToken(this.userToken);
    }
  }

  get userDataCurretnt() : Observable<any> {
    return this.currentUserData.asObservable();
  }

  get userLoginO() : Observable<any> {
    return this.currentUserLoginOn.asObservable();
  }

  
  login(formLogin: any) : Observable<any>{
    formLogin['ip'] = this.sharedService.userIP;
    formLogin['device'] = this.sharedService.userDevice;
    return this._http.post<any>(`${this._dataServ.baseURL}Account/Login`, formLogin).pipe(
      tap( loginData => {
        this.currentUserData.next(loginData);
        this.currentUserLoginOn.next(true);
      
      }),
      catchError( err => {
        this.currentUserLoginOn.next(false);
        return of(false);
      })
    )
}

register( fromRegister: any) : Observable<any> {
  fromRegister['ip'] = this.sharedService.userIP;
  fromRegister['device'] = this.sharedService.userDevice;
  fromRegister['phone'] = fromRegister['phone'].toString();
  fromRegister['Sex'] = "";

  return this._http.post<any>(`${this._dataServ.baseURL}Account/Register`, fromRegister).pipe(
    tap( registerData => {
      this.currentUserData.next(registerData);
      this.currentUserLoginOn.next(true);
    }),
    catchError( err => {
      this.currentUserLoginOn.next(false);
      return of(false);
    })
  )
}



  public async forgotPass(data: any) {
    let info = {
      emailDni: data,
      ip: this.sharedService.userIP,
      device: this.sharedService.userDevice,
    };
    return this._http
      .post(`${this._dataServ.baseURL}Security/Forgot`, info)
      .toPromise();
  }

  public resetPass(formData: any) {
    let info = {
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword,
      EmailDNI: formData.email,
      code: formData.code,
      ip: this.sharedService.userIP,
      device: this.sharedService.userDevice,
    };
    return this._http
      .post(`${this._dataServ.baseURL}Security/Reset`, info)
      .toPromise();
  }

  public decodeToken(token: string, changePass?: boolean) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    let tokenData = JSON.parse(jsonPayload);
    this.userData = {
      UserId: tokenData.UserId,
      UserName: tokenData.UserName,
      LastName: tokenData.LastName,
      Role: tokenData.Role,
      Email: tokenData.Email,
    };
    this.expToken = tokenData.exp;
    if (changePass === true) {
      //this._dataServ.goTo('/authentication/changepassword');
    } else {
      //this.redirectSegunDate(this.expToken);
    }
  }

  redirectSegunDate(exp: any) {
    if (this.checkTokenDate(exp)) {
      if (this.userData.Role != 'Cliente') {
        this._dataServ.goTo('/admin/home');
      } else {
        this._dataServ.goTo('/inicio');
      }
    } else {
      //this.showSesionEndModal();
    }
  }

  checkTokenDate(exp: number): boolean {
    let dateToken = new Date(exp * 1000);
    let dateNow = new Date();
    if (dateNow >= dateToken) {
      return false;
    } else {
      return true;
    }
  }

  public logOut(role: string) {
    this.userToken = null;
    this.userData = null;
    localStorage.removeItem('LuveckUserToken');
    role === 'Admin' || role === 'Dependiente'
      ? this._dataServ.goTo('/authentication/login')
      : this._dataServ.goTo('/inicio');
  }
}
