import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BaseResponse, SingleResponse } from './model/responses.model';
import { Observable } from 'rxjs';
import { LoginResponse } from './model/Auth/login-response.model';
import { LoginCredentials } from './model/Auth/login-credentials.model';
import { RegisterCredentials } from './model/register-credentials.models';
import { PointsCount } from './model/questionData/points.model';
import { StorageKeys, StorageService, storage } from './storage.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient, private storageService: StorageService, private router: Router) {}

  public login(
    credentials: LoginCredentials
  ): Observable<SingleResponse<LoginResponse>> {
    return this.http
      .post<SingleResponse<LoginResponse>>(
        `${this.getApiUrl()}/auth/login`,
        credentials,
        {
          headers: this.getNonAuthenticationHeaders(),
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

  public refreshAccessToken(): Observable<BaseResponse> {
    return this.http
      .post<BaseResponse>(
        `${this.getApiUrl()}/auth/refresh-token`,
        {
          userId: this.storageService.getUser().id,
          refreshToken: this.storageService.getRefreshToken()
        },
        {
          headers: this.getNonAuthenticationHeaders(),
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


  public logout() {
    this.storageService.removeAccessToken();
    this.storageService.removeRefreshToken();
    this.storageService.removeUser();
    this.router.navigate(["/login"])
  }

  public register(credentials: RegisterCredentials): Observable<BaseResponse> {
    return this.http
      .post<BaseResponse>(
        `${this.getApiUrl()}/auth/registration`,
        credentials,
        {
          headers: this.getNonAuthenticationHeaders(),
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
      .get<BaseResponse>(`${this.getApiUrl()}/joke`, {
        headers: this.getAuthenticationHeaders(),
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
      .get<BaseResponse>(`${this.getApiUrl()}/quote`, {
        headers: this.getAuthenticationHeaders(),
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
      .get<BaseResponse>(`${this.getApiUrl()}/questions`, {
        headers: this.getAuthenticationHeaders(),
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
      .get<BaseResponse>(`${this.getApiUrl()}/activity`, {
        headers: this.getAuthenticationHeaders(),
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
        `${this.getApiUrl()}/moodresult`,
        {
          pointCount,
        },
        {
          headers: this.getAuthenticationHeaders(),
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
        `${this.getApiUrl()}/moodhistory`,
        {
          moodType,
        },
        {
          headers: this.getAuthenticationHeaders(),
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
      .get<BaseResponse>(`${this.getApiUrl()}/moodcalendar`, {
        headers: this.getAuthenticationHeaders(),
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
        `${this.getApiUrl()}/newdiaryentry`,
        {
          //'text' is the property name on the backend of that object
          // 'value' is what gets assigned to the 'text' property
          text: value,
        },
        {
          headers: this.getAuthenticationHeaders(),
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
      .get<BaseResponse>(`${this.getApiUrl()}/diaryentry`, {
        headers: this.getAuthenticationHeaders(),
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
      .get<BaseResponse>(`${this.getApiUrl()}/quotes`, {
        headers: this.getAuthenticationHeaders()
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


  public getTriviaQuestions(): Observable<BaseResponse> {
    return this.http.get<BaseResponse>(`${this.getApiUrl()}/trivia`, {
      headers: this.getNonAuthenticationHeaders()
    }).pipe(
      map((response:BaseResponse) => {
        if (!response.isSuccess){
          throw new Error(response.message);
        }
        return response;
      })
    );
  }

  private getAuthenticationHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${storage.getItem(StorageKeys.ACCESS_TOKEN)}`,
    });
  }

  private getNonAuthenticationHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  private getApiUrl(): string {
    if (isDevMode()) {
      return 'https://localhost:44386/api';
    } else {
      return 'https://localhost:44386/api';
    }
  }
}
