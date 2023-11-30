import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterCredentials } from '../model/register-credentials.models';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { BaseResponse } from '../model/responses.model';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading: boolean = false;

  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get passwordsDoNotMatch() {
    const password = this.registerForm.get('password').value;
    const confirmPassword = this.registerForm.get('confirmPassword').value;
    return password !== confirmPassword && confirmPassword !== '';
  }

  constructor(private router: Router, private authService: ApiService) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
    });
  }

  onRegister() {
    let registerCredentials = new RegisterCredentials(
      this.email.value,
      this.password.value,
      this.firstName.value,
      this.lastName.value
    );
    if (this.passwordsDoNotMatch) {
      this.handleError(new Error('Passwords do not match'));
      return;
    }
    this.register(registerCredentials); 
  }

  register(regCredentials: RegisterCredentials) {
    this.isLoading = true;
    this.authService.register(regCredentials).subscribe({
      next: this.handleSuccess.bind(this),
      error: this.handleError.bind(this),
    });
    this.isLoading = false;
    this.router.navigate(['/login'])
  }

  handleSuccess(responseData: BaseResponse): void {
    this.isLoading = false;
  }

  handleError(error: Error): void {
    this.isLoading = false;
  }

}
