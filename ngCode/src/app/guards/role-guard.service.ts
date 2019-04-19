import { Injectable } from '@angular/core';
import { Router, CanActivate,ActivatedRouteSnapshot} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {
  constructor(public auth: AuthenticationService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const user_role = localStorage.getItem('user_role');
   
    if (
      
      user_role !== expectedRole
    ) {
      this.router.navigate(['user']);
      return false;
    }
    return true;
  }
}