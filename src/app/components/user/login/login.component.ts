import { Component, TemplateRef, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginConfig } from './login.config';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	public config = LoginConfig;

	public loginForm = this.formBuilder.group({
		email: new FormControl('',  [Validators.required, Validators.email, Validators.pattern(
		'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
		),]),
		password: new FormControl('', [Validators.required]),
		remember: new FormControl(false, [Validators.required]),
	});
  	hidePassword: boolean = true;

  	private modalService = inject(NgbModal);
	closeResult = '';


	constructor(
		private formBuilder: FormBuilder,
		private login: AuthService
	) {
	}

	get email(){
		return this.loginForm.controls.email;	
	}

	get pass(){
		return this.loginForm.controls.password;	
	}

	onLogin()
	{
		this.login.login(this.loginForm.value).subscribe({
			next: (data) => {
				console.log(data)
				if (data.token != null) {
					console.log('Mostrar un toast ARREGLARRRRRR POR FAVOR NO OLBIDAR INDICADOR CARGA')
					sessionStorage.setItem('AmorePizza', data.token);
				}
				
				//sessionStorage.setItem('AmorePizzaMenu', data.result.moduleRoleResponse);
			},
			error: (err) => {
				console.log(err)
			}      
		
		})	
	}

  open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);

		console.log(this.closeResult)
	}

  private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:				
				return `with: ${reason}`;
		}
	}
}
