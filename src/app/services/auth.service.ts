import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';
import { DataService } from './data.service';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userToken: any = null;
  userData: any = null;
  expToken: number | any = null;

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  currentUserData: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor(
    private _dataServ: DataService,
    private _http: HttpClient,
    private sharedService: SharedService
  ) {
    this.getCurrentUser();
  }

  getCurrentUser() {
    const tokentUser = sessionStorage.getItem('AmorePizza');
    //const menu = sessionStorage.getItem('AmorePizzaMddenu');
    //console.log(menu);
    if (tokentUser) {
      this.userToken = tokentUser;
      this.decodeToken(this.userToken);
    }
  }

  get userDataCurretnt(): Observable<any> {
    return this.currentUserData.asObservable();
  }

  get userLoginO(): Observable<any> {
    return this.currentUserLoginOn.asObservable();
  }

  login(formLogin: any): Observable<any> {
    formLogin['ip'] = this.sharedService.userIP;
    formLogin['device'] = this.sharedService.userDevice;
    return this._http
      .post<any>(`${this._dataServ.baseURL}Account/Login`, formLogin)
      .pipe(
        map((response) => {
          if (response.token != null) {
            this.decodeToken(response.token);
            this.expToken = response.expiration;
            this.currentUserLoginOn.next(true);
            return response;
          } else 
            console.log(response)
          
          return response.body;
        }),
        tap((loginData) => {
          this.currentUserData.next(loginData);
          
        }),
        catchError((err) => {
          // Ajusta error contrasena
          this.currentUserLoginOn.next(false);
          if (err.error.errors[0] != null){
            console.log(err.error.errors[0])          
            return err.error.errors[0]
          } else {
            console.log(err.errors[0])
            return err.error
          }
          
          return of(false);
          return err.message
        })
      );
  }

  register(fromRegister: any): Observable<any> {
    fromRegister['ip'] = this.sharedService.userIP;
    fromRegister['device'] = this.sharedService.userDevice;
    fromRegister['phone'] = fromRegister['phone'].toString();
    fromRegister['CityId'] = '1';
    fromRegister['City'] = null;
    fromRegister['UserType'] = 1;

    return this._http
      .post<any>(`${this._dataServ.baseURL}Account/CreateUser`, fromRegister, {
        observe: 'response',
      })
      .pipe(
        map((response) => {
          if (response.status === 204) {
            return {
              success: true,
              message:
                'Debe confirmar su cuenta, al correo le llego un correo de confirmación.',
            };
          }
          return response.body;
        }),
        catchError((err) => {
          this.currentUserLoginOn.next(false);
          return of(false);
        })
      );
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

  public TokenDecode(token: string){

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
      Name: tokenData.Name,
      LastName: tokenData.LastName,
      Role: tokenData['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
      Email: tokenData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
      Photo: tokenData.Photo
    };
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
