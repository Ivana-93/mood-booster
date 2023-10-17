import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BaseResponse, ErrorResponse, SingleResponse } from '../model/responses.model';
import { User } from '../model/user.model';
import { LoginResponse } from '../model/login-response.model';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  invalidLogin: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }


  login(credentials: any) {
    this.authService.login(credentials)
      .subscribe(
        (responseData: SingleResponse<LoginResponse>) => this.handleSuccess(responseData),
        (error: Error) => this.handleError(error)
        );
  }


  handleSuccess(responseData: SingleResponse<LoginResponse>): void {
    localStorage.setItem("token", responseData.data.token);
    localStorage.setItem("user", JSON.stringify(responseData.data.user));
    this.router.navigate(["/"]);
  }

  handleError(error: Error): void {
    console.log("Fail", error.message);

    this.invalidLogin = true;
  }
}
