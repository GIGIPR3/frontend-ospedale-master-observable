import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { LogAuthService } from "../services/log.auth.service";



export function authGuardFn(role: string): CanActivateFn {
  return () => {
    const authService = inject(LogAuthService)
    const router = inject(Router);
    if (authService.hasRole(role)) {
      return true;
    }
    router.navigate(['login']);
    return false;
  }
}
  

