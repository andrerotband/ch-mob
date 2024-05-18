import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { UserStateService } from './userstate.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (private authService: AuthService,
    private userStateService: UserStateService,
    private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const user = this.userStateService.getCurrentUser();
    if (user) {
      // A lógica adicional pode ser implementada aqui se necessário
      return true;
    } else {
      // Redirecionar para a página de login ou outra página apropriada
      this.router.navigate(['/login']);
      return false;
    }
  }
}
