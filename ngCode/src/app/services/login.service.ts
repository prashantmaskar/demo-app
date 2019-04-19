import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import{ environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  username:string="";
  rootapi=environment.baseUrl;
  isloggedin:boolean=false;
  constructor(private http: HttpClient) {
   }

   setLoggedin(logged){
    this.isloggedin=logged;
  }
  login(username,password){
    var headers= new Headers();
    headers.append('Content-Type','application/X-www-form=urlencoded');
    
    return this.http.post(this.rootapi+"sign_in/login_auth",{"username":username,"password":password}).pipe(map((res: any)=>res));
  }
  getDetails(){
    return this.http.post(this.rootapi+"user.php",{"indexNo":this.username}).pipe(map((res: any)=>res));
  }
  setIndex(index_signin){
    this.username=index_signin;
  }
  getIndex(){
    return this.username;
  }
  updateDetails(username,firstname,lastname,password){
    return this.http.post(this.rootapi+"update.php",{"indexno":username,"firstname":firstname,"lastname":lastname,"password":password}).pipe(map(res=>res));
  }
  
  private _errorHandler(error:Response){
    console.error("Error Occured:"+error);
    return Observable.throw(error||"Some error occured in Server");
  }

}


