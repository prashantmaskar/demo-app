import { Injectable } from '@angular/core';
import {Router, CanActivate,CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, from } from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  usertoken:string;
  constructor(
    private router:Router,
    private authenticationService:AuthenticationService
    ){
this.usertoken= '';
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.usertoken = localStorage.getItem('auth-key');
    if(this.usertoken)
    { 
    this.authenticationService.currentUser(this.usertoken).subscribe(activeuser=>{
      if(activeuser.req_status=="0")
      {
        this.router.navigate(['/']);
        return false;
      }

    });
    return true;
  }
  else{
    this.router.navigate(['/']);
        return false;
  }
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.usertoken = localStorage.getItem('auth-key');
    this.authenticationService.currentUser(this.usertoken).subscribe(activeuser=>{
      if(activeuser.req_status=="0")
      {
        this.router.navigate(['/']);
        return false;
      }

    });
    return true;
  }
}
