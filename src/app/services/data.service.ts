import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseURL:string = environment.url_API;
  progress:boolean = false

  constructor(
    private _router:Router,
    private _location:Location,
  ) { }

  goTo(path:string, parametro?:string){
    if(parametro){
      this._router.navigate([`${path}/${parametro}`])
    }else{
      this._router.navigate([`${path}`])
    }
  }

  goBack(){
    this._location.back()
  }
}
