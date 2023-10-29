import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

type AuthGuardOptions = {
  requiresAuthentication: boolean;
};

const defaultAuthGuardOptions = (): AuthGuardOptions => ({
  requiresAuthentication: true,
});
export const authGuard = (
  options: AuthGuardOptions = defaultAuthGuardOptions()
): CanActivateFn => {
  return (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const router = inject(Router);
    const authService = inject(AuthService);

    if (options.requiresAuthentication === authService.canPass()) {
      return true;
    }
    return router.createUrlTree(['/auth']);
  };
};
