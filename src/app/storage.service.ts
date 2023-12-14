import { Injectable } from '@angular/core';
import { User } from './model/user.model';

// change here if you want to use local or session storage throught the app
export const storage = localStorage;
// export const storage = sessionStorage

export class StorageKeys {
  public static readonly ACCESS_TOKEN: string = 'access_token';
  public static readonly REFRESH_TOKEN: string = 'refresh_token';
  public static readonly USER: string = 'user';
}

@Injectable({ providedIn: 'root' })
export class StorageService {
  public getAccessToken(): string {
    return storage.getItem(StorageKeys.ACCESS_TOKEN);
  }

  public setAccessToken(token: string): void {
    storage.setItem(StorageKeys.ACCESS_TOKEN, token);
  }

  public removeAccessToken(): void {
    storage.removeItem(StorageKeys.ACCESS_TOKEN);
  }

  public getRefreshToken(): string {
    return storage.getItem(StorageKeys.REFRESH_TOKEN);
  }

  public setRefreshToken(token: string): void {
    storage.setItem(StorageKeys.REFRESH_TOKEN, token);
  }
  
  public removeRefreshToken(): void {
    storage.removeItem(StorageKeys.REFRESH_TOKEN);
  }

  public getUser(): User {
    return JSON.parse(storage.getItem(StorageKeys.USER));
  }

  public setUser(user: User): void {
    storage.setItem(StorageKeys.USER, JSON.stringify(user));
  }

  public removeUser(): void {
    storage.removeItem(StorageKeys.USER);
  }
}
