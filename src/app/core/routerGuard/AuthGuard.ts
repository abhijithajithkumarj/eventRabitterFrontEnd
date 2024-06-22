import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  console.log('AuthGuard#canActivate called');
  if (localStorage.getItem('user')) {
    console.log('User authenticated');
    return true;
  }else{
    console.log('User not authenticated, redirecting to login');
    router.navigate(['/login']);
    return false;
  }
  
};
