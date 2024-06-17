import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterConfig } from './register.config';
import { AuthService } from 'src/app/services/auth.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  @ViewChild('content') content: TemplateRef<any> | undefined;
  public config = RegisterConfig;
  hidePassword: boolean = true;
  public loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$'),
    ]),
    password: new FormControl('', [Validators.required]),
    dni: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$'),
      Validators.minLength(8),
    ]),
    address: new FormControl('', [Validators.required]),
    referedCode: new FormControl(''),
  });
  

  constructor(
    private auth : AuthService,
    private modalService: NgbModal,
    private router: Router
  ) {
    
  }

  public onRegister() {
    this.auth.register(this.loginForm.value).subscribe(
      result => {
        console.log(result)
        if (result.success) {
          this.open()
        } else {
          console.log('User registration failed');
          // Aquí puedes manejar el fallo en el registro
        }
      },
      error => {
        console.log(error)
      });
  }


  get name() {
    return this.loginForm.controls.name;
  }
  get lastName() {
    return this.loginForm.controls.lastName;
  }
  get phone() {
    return this.loginForm.controls.phone;
  }
  get address() {
    return this.loginForm.controls.address;
  }
  get dni() {
    return this.loginForm.controls.dni;
  }
  get email() {
    return this.loginForm.controls.email;
  }
  get pass() {
    return this.loginForm.controls.password;
  }

  public closeResult = ''

  open() {
		this.modalService.open(this.content, {centered: true , ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
        this.router.navigate(['/home']);
			},
			(reason) => {
        this.router.navigate(['/home']);
			},
		);
	}
}
