import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit{

  @ViewChild('check') public check: any;
  public hamburgerMenuState = '';
  links = environment.menu;
  userLoginOn = false
  userLoginData : any 

  constructor(
    private login: AuthService
    //private _authServ:AuthService
  ) {

    //if(this._authServ.checkTokenDate(this._authServ.expToken) && this._authServ.userToken){}
    //else {
      //this.links = this.links.filter( x => x.loged == false);
//}
    
  }
  ngOnInit(): void {
    this.login.currentUserLoginOn.subscribe(
      {
        next: (userLoginOn) => {
          if(!userLoginOn){
            console.log("object")
            this.links = environment.menu.filter( x => x.loged == false);
          } else {
            console.log("biadsf")
            this.links = environment.menu.filter( x => x.loged == true);

            console.log("metodo mene")
          }
        }
      }
    )

    this.login.currentUserData.subscribe({
      next: (userData) => {
        this.userLoginData = userData
      }    
    })
  }



  public openMenu(){
    this.check.nativeElement.checked = !this.check.nativeElement.checked;
  
    if (this.hamburgerMenuState === '')
        this.hamburgerMenuState = 'active';
    else
      this.hamburgerMenuState = '';
  }
}
