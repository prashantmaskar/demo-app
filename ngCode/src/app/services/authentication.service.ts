import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import{ environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  rootapi=environment.baseUrl;

  constructor(private http: HttpClient) { }

currentUser(usertoken){
  var headers= new Headers();
  headers.append('Content-Type','application/X-www-form=urlencoded');
  
  return this.http.post(this.rootapi+"sign_in/check_login_status",{"usertoken":usertoken}).pipe(map((res: any)=>res));
}



}

