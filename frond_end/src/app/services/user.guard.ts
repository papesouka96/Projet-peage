import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot,
UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';
import { WebsocketService } from './websocket.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public authService: UsersService,
    public router: Router,
    public websocket : WebsocketService,
  ) { }

  // Méthode de limitation d'accès à l'application aux connéctés
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn !== true ) {
      window.alert("Accès non autorisé!");
      this.router.navigate([''])
    }
    return true;
  }
/*   canLoad(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<string> | Promise<string> | any {
    var isLoggedIn = this.authService.getRole();
    if (  isLoggedIn="Utilisateur") {
      window.alert("Accès non autorisé!");
      this.router.navigate([''])
    }
} */
  
}