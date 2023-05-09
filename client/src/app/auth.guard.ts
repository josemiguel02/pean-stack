import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';

export const AuthGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  return await authService.canActivate();
};

export const LoggedInGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  return await authService.canDisable();
};
