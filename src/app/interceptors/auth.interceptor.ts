/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ObservableInput, throwError, timer } from 'rxjs';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { SingleResponse } from '../model/responses.model';
import { StorageKeys, StorageService, storage } from '../storage.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(
    private route: Router,
    private apiService: ApiService,
    private storageService: StorageService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.indexOf('/refresh-token') > -1) {
      return next.handle(req);
    }

    return next.handle(req).pipe(
      catchError<HttpEvent<any>, ObservableInput<any>>((error) => {
        if (error.error.Status == 401) {
          return this.apiService.refreshAccessToken().pipe(
            switchMap((value: SingleResponse<{ accessToken: string }>) => {
              this.storageService.setAccessToken(value.data.accessToken);

              let clone = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${value.data.accessToken}`
                }
              });

              return next.handle(clone);
            }),
            catchError((error) => {
              this.apiService.logout();
              return throwError(() => error);
            })
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }
}
