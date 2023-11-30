import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import {
  ErrorResponse,
  SingleResponse,
} from '../model/responses.model';
import { LoginResponse } from '../model/Auth/login-response.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginCredentials } from '../model/Auth/login-credentials.model';
import { StorageService } from '../storage.service';
import { MessageService } from 'primeng/api';

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

  constructor(
    private router: Router,
    private authService: ApiService,
    private storageService: StorageService,
    private messageService: MessageService
  ) {}

  loginForm: FormGroup;
  isLoading: boolean = false;

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
    this.authService.login(credentials).subscribe({
      next: this.handleLoginSuccess.bind(this),
      error: this.handleLoginError.bind(this),
    });
  }

  handleLoginSuccess(responseData: SingleResponse<LoginResponse>): void {
    this.storageService.setAccessToken(responseData.data.token);
    this.storageService.setRefreshToken(responseData.data.refreshToken);
    this.storageService.setUser(responseData.data.user);
    this.router.navigate(['/']);
  }

  handleLoginError(error: ErrorResponse): void {
    console.log('Fail', error.message);
    if (error.status = 401){
      this.messageService.add(
        { severity: 'error', summary: 'Wrong email or password', detail: 'Try to login again' })
    }
    this.isLoading = false;
  }

  onRegister(){
    this.router.navigate(['/register']);
  }
}
