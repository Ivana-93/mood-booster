import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BaseResponse, SingleResponse } from './model/responses.model';
import { Observable } from 'rxjs';
import { LoginResponse } from './model/Auth/login-response.model';
import { LoginCredentials } from './model/Auth/login-credentials.model';
import { RegisterCredentials } from './model/register-credentials.models';
import { PointsCount } from './model/questionData/points.model';

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

  public getQuestions(): Observable<BaseResponse> {
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

  public getRandomActivity(): Observable<BaseResponse> {
    return this.http
      .get<BaseResponse>(`${this.GetApiUrl()}/activity`, {
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

  public postMoodQuizResult(pointCount: number): Observable<BaseResponse> {
    return this.http
      .post<BaseResponse>(
        `${this.GetApiUrl()}/moodresult`,
        {
          pointCount,
        },
        {
          headers: this.GetAuthenticationHeaders(),
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

  public updateMoodHistoryData(moodType: string): Observable<BaseResponse> {
    return this.http
      .post<BaseResponse>(
        `${this.GetApiUrl()}/moodhistory`,
        {
          moodType,
        },
        {
          headers: this.GetAuthenticationHeaders(),
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

  public getMoodCalendar(): Observable<BaseResponse> {
    return this.http
      .get<BaseResponse>(`${this.GetApiUrl()}/moodcalendar`, {
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

  public updateDiary(value: string): Observable<BaseResponse> {
    return this.http
      .post<BaseResponse>(
        `${this.GetApiUrl()}/newdiaryentry`,
        {
          //ovdje je text jer je property na backendu tog objekta naziva text
          // value je ono čija se vrijednost dodjeljuje na property text
          text: value,
        },
        {
          headers: this.GetAuthenticationHeaders(),
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

  public getDiaryEntries(): Observable<BaseResponse> {
    return this.http
      .get<BaseResponse>(`${this.GetApiUrl()}/diaryentry`, {
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

  public getUserQuotes(): Observable<BaseResponse> {
    return this.http
      .get<BaseResponse>(`${this.GetApiUrl()}/quotes`, {
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
