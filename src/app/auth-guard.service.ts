import { inject} from '@angular/core';
import {
  CanActivateFn,
  CanActivateChildFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { Observable } from 'rxjs';
import { StorageKeys, storage } from './storage.service';
 


export const canActivateGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | 
   Promise<boolean | UrlTree> | 
   boolean | 
   UrlTree  => {
    const router = inject(Router);
    if (!storage.getItem(StorageKeys.ACCESS_TOKEN)) {
            router.navigate(['/login']);
            return false;
    }
    return true;
};
 
export const canActivateChildGuard: CanActivateChildFn = canActivateGuard;