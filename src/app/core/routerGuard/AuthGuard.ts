import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthserviceService } from '../service/auth/authservice.service';

@Injectable({
  providedIn: 'root' 
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private tokenService: AuthserviceService) {}
  canActivate(): boolean {
    const jwtTok = this.tokenService.getToken(); 
    if (jwtTok) {
      return true; 
    } else {
      this.router.navigate(['/login']); 
      return false;
    }
  }
}
