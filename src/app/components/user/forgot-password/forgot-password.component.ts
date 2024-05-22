import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgotPasswordConfig } from './forgot-password.config';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  public config = ForgotPasswordConfig;


  forgotForm = this.formBuilder.group({
    email: new FormControl('',  [Validators.required, Validators.email, Validators.pattern(
      '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
    ),]),
  })

  get email(){
		return this.forgotForm.controls.email;	
	}

  constructor( private formBuilder: FormBuilder) {

  }

  recoverPassword(formData: any){

    if(this.forgotForm.valid){
      
    } else {
      
    }
    
    console.log(formData)


    this.closeModal.emit();
  }
}
