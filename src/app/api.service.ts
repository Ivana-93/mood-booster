import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BaseResponse, SingleResponse } from './model/responses.model';
import { Observable } from 'rxjs';
import { LoginResponse } from './model/Auth/login-response.model';
import { LoginCredentials } from './model/Auth/login-credentials.model';
import { RegisterCredentials } from './model/register-credentials.models';
import { StorageKeys, StorageService, storage } from './storage.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private router: Router
  ) {}


  // Method is used to log in a user by sending a POST request to the server with the provided login credentials.
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

  // Method is used to refresh the access token of the currently logged in user.
  public refreshAccessToken(): Observable<BaseResponse> {
    return this.http
      .post<BaseResponse>(
        `${this.getApiUrl()}/auth/refresh-token`,
        {
          userId: this.storageService.getUser().id,
          refreshToken: this.storageService.getRefreshToken(),
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

  // Method is used to log out the currently logged in user.
  public logout() {
    this.storageService.removeAccessToken();
    this.storageService.removeRefreshToken();
    this.storageService.removeUser();
    this.router.navigate(['/login']);
  }


  // Method is used to register a new user by sending a POST request to the server with the provided register credentials.
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

  // Method is used to get the joke data from server.
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

  // Method for getting quote from server.
  public getQuote(): Observable<BaseResponse> {
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

  // Method is used to get the question data for mood quiz.
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

  // Method to get the activity data.
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

  // Method for getting the mood quiz result from the server.
  // The pointCount parameter is the number of points the user has earned from the mood quiz.
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

  // Method for sending the mood result data to the server for updating histroy of data.
  // The moodType parameter is mood type result the user has get after finished the quiz.
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

  // Method for getting the mood history data from the server.
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


  // Method for sending the diary entry data to the server.
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

  // Method for getting the diary entry data from the server.
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

  // Method for getting the user's quotes from the server.
  public getUserQuotes(): Observable<BaseResponse> {
    return this.http
      .get<BaseResponse>(`${this.getApiUrl()}/quotes`, {
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

  // Method for retriving trivia questions from server.
  public getTriviaQuestions(): Observable<BaseResponse> {
    return this.http
      .get<BaseResponse>(`${this.getApiUrl()}/trivia`, {
        headers: this.getNonAuthenticationHeaders(),
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

  // Private method for getting the authentication headers.
  private getAuthenticationHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${storage.getItem(StorageKeys.ACCESS_TOKEN)}`,
    });
  }

  // Private method for getting the non-authentication headers.
  private getNonAuthenticationHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  // Private method for getting the API URL depending on the environment.
  private getApiUrl(): string {
    if (isDevMode()) {
      return 'https://localhost:44386/api';
    } else {
      return 'https://localhost:44386/api';
    }
  }
}
