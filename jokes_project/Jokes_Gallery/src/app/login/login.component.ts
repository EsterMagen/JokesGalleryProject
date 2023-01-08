import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  protected errorMessages: any = {};
  constructor(private router: Router) {}

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(4)]);

  emailFieldBlur() {
    if(this.emailFormControl.value === '')
      this.errorMessages['email'] = 'this is required field';
    else if(!this.emailFormControl.valid)
      this.errorMessages['email'] = 'please type a valid address mail';
    else
      delete this.errorMessages['email'];  
  }

  passwordFieldBlur() {
    if(this.passwordFormControl.value === '')
    this.errorMessages['password'] = 'this is required field';
    else if(!this.passwordFormControl.valid)
      this.errorMessages['password'] = 'the password length should be 4-20 chars'; 
    else
      delete this.errorMessages['password']; 
  }

  submit() {
    if(this.emailFormControl.valid && this.passwordFormControl.valid)
      this.router.navigate(['/GalleryJokes']); 
  }
}
