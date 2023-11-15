import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BaseResponse, SingleResponse } from './model/responses.model';
import { Observable } from 'rxjs';
import { LoginResponse } from './model/login-response.model';
import { LoginCredentials } from './model/login-credentials.model';
import { RegisterCredentials } from './model/register-credentials.models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  public login(
    credentials: LoginCredentials
  ): Observable<SingleResponse<LoginResponse>> {
    return this.http
      .post<SingleResponse<LoginResponse>>(
        `${this.GetApiUrl()}/auth/login`,
        credentials,
        {
          headers: this.GetNonAuthenticationHeaders(),
        }
      )
      .pipe(
        map((response: SingleResponse<LoginResponse>) => {
          if (!response.isSuccess) {
            throw new Error(response.message);
          }
          return response;
        })
      );
  }

  public logout() {
    localStorage.removeItem('token');
  }

  public register(credentials: RegisterCredentials): Observable<BaseResponse> {
    return this.http
      .post<BaseResponse>(
        `${this.GetApiUrl()}/auth/registration`,
        credentials,
        {
          headers: this.GetNonAuthenticationHeaders(),
        }
      )
      .pipe(
        map((response: BaseResponse) => {
          if (!response.isSuccess) {
            throw new Error(response.message);
          }
          return response;
        })
      );
  }

  public getJoke(): Observable<BaseResponse> {
    return this.http
      .get<BaseResponse>(`${this.GetApiUrl()}/joke`, {
        headers: this.GetAuthenticationHeaders(),
      })
      .pipe(
        map((response: BaseResponse) => {
          if (!response.isSuccess) {
            throw new Error(response.message);
          }
          return response;
        })
      );
  }


  public getQuotes(): Observable<BaseResponse> {
    return this.http
      .get<BaseResponse>(`${this.GetApiUrl()}/quote`, {
        headers: this.GetAuthenticationHeaders(),
      })
      .pipe(
        map((response: BaseResponse) => {
          if (!response.isSuccess) {
            throw new Error(response.message);
          }
          return response;
          
        })
      );
  }

  public getQuestions (): Observable<BaseResponse> {
    return this.http
      .get<BaseResponse>(`${this.GetApiUrl()}/questions`, {
        headers: this.GetAuthenticationHeaders(),
      })
      .pipe(
        map((response: BaseResponse) => {
          if (!response.isSuccess) {
            throw new Error(response.message);
          }
          return response;
          
        })
      );
  }


  private GetAuthenticationHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
  }

  private GetNonAuthenticationHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
  }

  private GetApiUrl(): string {
    if (isDevMode()) {
      return 'https://localhost:44386/api';
    } else {
      return 'https://localhost:44386/api';
    }
  }
}
