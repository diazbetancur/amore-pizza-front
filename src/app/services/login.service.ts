import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    userToken: any = null;
    userData: any = null;
    expToken: number | any = null;

    currentUserLoginOn : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    currentUserData : BehaviorSubject<any> = new BehaviorSubject<any>({});

    constructor( 
      private http: HttpClient,
      private _dataServ: DataService,
    ) { 

    }

    login(formdata: any) : Observable<any>{
        // Add your login logic here
        // Return true if login is successful, false otherwise
        console.log("Llama al servicio")

        return this.http.post<any>(`${this._dataServ.baseURL}Security/Login`, formdata).pipe(
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


    get userDataCurretnt() : Observable<any> {
      return this.currentUserData.asObservable();
    }

    get userLoginO() : Observable<any> {
      return this.currentUserLoginOn.asObservable();
    }

    logout(): void {
        // Add your logout logic here
    }
}