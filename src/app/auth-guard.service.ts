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
 


export const canActivateGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | 
   Promise<boolean | UrlTree> | 
   boolean | 
   UrlTree  => {
    const router = inject(Router);
    if (!localStorage.getItem('token')) {
            router.navigate(['/login']);
            return false;
    }
    return true;
};
 
export const canActivateChildGuard: CanActivateChildFn = canActivateGuard;