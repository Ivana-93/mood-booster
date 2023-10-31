import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import {
  BaseResponse,
  ErrorResponse,
  SingleResponse,
} from '../model/responses.model';
import { User } from '../model/user.model';
import { LoginResponse } from '../model/login-response.model';
import { Message } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginCredentials } from '../model/login-credentials.model';
import { StorageService } from '../storage.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  constructor(private router: Router, private authService: ApiService, private storageService: StorageService) {}

  loginForm: FormGroup;
  isLoading: boolean = false;
  overlayVisible: boolean = false;
  
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  onLogin() {
    let loginCredentials = new LoginCredentials(
      this.email.value,
      this.password.value
    );
    this.login(loginCredentials);
  }

  private login(credentials: LoginCredentials): void {
    this.isLoading = true;
    this.authService.login(credentials).subscribe(
      //success
      (responseData: SingleResponse<LoginResponse>) =>
        this.handleSuccess(responseData),
      //error
      (error: Error) => this.handleError(error)
    );
  }

  private finishLoginRequest() {
    this.isLoading = false;
  }

  handleSuccess(responseData: SingleResponse<LoginResponse>): void {
    this.storageService.setToken(responseData.data.token);
    this.storageService.setUser(responseData.data.user);
    this.router.navigate(['/']);
  }

  handleError(error: Error): void {
    console.log('Fail', error.message);
    this.finishLoginRequest();
  }

  public validateEmail(): void {
    this.overlayVisible = !this.email.valid && this.email.touched;
  }


}


