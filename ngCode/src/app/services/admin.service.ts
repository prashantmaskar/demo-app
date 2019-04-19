import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpEvent} from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import{ environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  designation:string="";
  client:string="";
  detail:string="";
  rootapi=environment.baseUrl;
  isloggedin:boolean=false;
  constructor(private http: HttpClient) {

   }
   setLoggedin(logged){
    this.isloggedin=logged;
  }
  add_designation(designation,usertoken){
    var headers= new Headers();
    headers.append('Content-Type','application/X-www-form=urlencoded');
    return this.http.post(this.rootapi+"admin/add_designation",{"designation":designation,"usertoken":usertoken}).pipe(map((res: any)=>res));
  }
  add_client(client,usertoken,logofile: File){


    let formData = new FormData();
    formData.append('upload', logofile);
    formData.append('client', client);
    formData.append('usertoken',usertoken);
  
    let params = new HttpParams();
  
    const options = {
      params: params,
      reportProgress: true,
    };

    const req = new HttpRequest('POST', this.rootapi+"admin/add_client", formData, options);
    return this.http.request(req);
  }
  add_detail(detail,usertoken){
    var headers= new Headers();
    headers.append('Content-Type','application/X-www-form=urlencoded');
    return this.http.post(this.rootapi+"admin/add_detail",{"detail":detail,"usertoken":usertoken}).pipe(map((res: any)=>res));
  }
  update_details(uid,usertoken,first_name,last_name,email){
    var headers= new Headers();
    headers.append('Content-Type','application/X-www-form=urlencoded');
    return this.http.post(this.rootapi+"admin/update_detail",{"uid":uid,"usertoken":usertoken,"first_name":first_name,"last_name":last_name,"email":email}).pipe(map((res: any)=>res));
  }
  
  get_designation_list(){
    var headers= new Headers();
    headers.append('Content-Type','application/X-www-form=urlencoded');
    return this.http.get(this.rootapi+"admin/get_designation_list").pipe(map((res: any)=>res));
  }
  get_role_list(){
    var headers= new Headers();
    headers.append('Content-Type','application/X-www-form=urlencoded');
    return this.http.get(this.rootapi+"admin/get_role_list").pipe(map((res: any)=>res));
  }
  get_client_list(){
    var headers= new Headers();
    headers.append('Content-Type','application/X-www-form=urlencoded');
    return this.http.get(this.rootapi+"admin/get_client_list").pipe(map((res: any)=>res));
  }
  edit_client(id){
    var headers= new Headers();
    headers.append('Content-Type','application/X-www-form=urlencoded');
    return this.http.post(this.rootapi+"admin/get_client_details",{"client_id":id}).pipe(map((res: any)=>res));
  }
  update_client_details(client,client_id,logofile: File){

    let formData = new FormData();
    formData.append('upload', logofile);
    formData.append('client', client);
    formData.append('cid',client_id);
  
    let params = new HttpParams();
  
    const options = {
      params: params,
      reportProgress: true,
    };

    const req = new HttpRequest('POST', this.rootapi+"admin/update_client_details", formData, options);
    return this.http.request(req);
    // var headers= new Headers();
    // headers.append('Content-Type','application/X-www-form=urlencoded');
    // return this.http.post(this.rootapi+"admin/update_client_details",{"client":client,"cid":client_id}).pipe(map((res: any)=>res));
  }
  get_detail(usertoken){
    var headers= new Headers();
    headers.append('Content-Type','application/X-www-form=urlencoded');
    return this.http.post(this.rootapi+"admin/get_logged_user_details",{"usertoken":usertoken}).pipe(map((res: any)=>res));
  }
  edit_designation(desg_id){
    var headers= new Headers();
    headers.append('Content-Type','application/X-www-form=urlencoded');
    return this.http.post(this.rootapi+"admin/get_designation_details",{"desig_id":desg_id}).pipe(map((res: any)=>res));
  }
  update_designation_details(designation,did){
    var headers= new Headers();
    headers.append('Content-Type','application/X-www-form=urlencoded');
    return this.http.post(this.rootapi+"admin/update_designation_details",{"designation":designation,"did":did}).pipe(map((res: any)=>res));
  }
  del_designation(id){
    var headers= new Headers();
    headers.append('Content-Type','application/X-www-form=urlencoded');
    return this.http.post(this.rootapi+"admin/del_designation",{"id":id}).pipe(map((res: any)=>res));
  }

  add_teammember(teammembername,teammemberlname,membereamil,mainrole,utype,usertoken){
    var headers= new Headers();
    headers.append('Content-Type','application/X-www-form=urlencoded');
    return this.http.post(this.rootapi+"admin/add_member",{"teammembername":teammembername,"teammemberlname":teammemberlname,"membereamil":membereamil,"mainrole":mainrole,"utype":utype,"usertoken":usertoken}).pipe(map((res: any)=>res));
  }
  get_team_list(){
    var headers= new Headers();
    headers.append('Content-Type','application/X-www-form=urlencoded');
    return this.http.get(this.rootapi+"admin/get_team_list").pipe(map((res: any)=>res));
  }
  edit_member(uid){
    var headers= new Headers();
    headers.append('Content-Type','application/X-www-form=urlencoded');
    return this.http.post(this.rootapi+"admin/get_member_details",{"uid":uid}).pipe(map((res: any)=>res));
  }
  update_teammember(teammembername,teammemberlname,mainrole,utype,uid){
    var headers= new Headers();
    headers.append('Content-Type','application/X-www-form=urlencoded');
   return this.http.post(this.rootapi+"admin/update_member_details",{"first_name":teammembername,"last_name":teammemberlname,"designation":mainrole,"utype":utype,"uid":uid}).pipe(map((res: any)=>res));

  }
  del_member(uid){
    var headers= new Headers();
    headers.append('Content-Type','application/X-www-form=urlencoded');
    return this.http.post(this.rootapi+"admin/del_member",{"uid":uid}).pipe(map((res: any)=>res));
  }
  del_client(id){
    var headers= new Headers();
    headers.append('Content-Type','application/X-www-form=urlencoded');
    return this.http.post(this.rootapi+"admin/del_client",{"id":id}).pipe(map((res: any)=>res));
  }
  reset_password(oldpassword,newpassword,usertoken){
    var headers= new Headers();
    headers.append('Content-Type','application/X-www-form=urlencoded');
    return this.http.post(this.rootapi+"admin/reset_password",{"old_password":oldpassword,"new_password":newpassword,"usertoken":usertoken}).pipe(map((res: any)=>res));
  }
  get_user_monthly_avg_rating(usertoken){
    var headers= new Headers();
    headers.append('Content-Type','application/X-www-form=urlencoded');
    return this.http.post(this.rootapi+"Associate_rating/get_user_monthly_avg_rating",{"usertoken":usertoken}).pipe(map((res: any)=>res));
  }
  get_user_rating_details_by_id(rating_id){
    var headers= new Headers();
    headers.append('Content-Type','application/X-www-form=urlencoded');
    return this.http.post(this.rootapi+"Associate_rating/get_user_rating_details_by_id",{"rating_id":rating_id}).pipe(map((res: any)=>res));
  }

  chk_if_can_rate(usertoken){
    var headers= new Headers();
    headers.append('Content-Type','application/X-www-form=urlencoded');
    return this.http.post(this.rootapi+"Associate_rating/chk_if_can_rate",{"usertoken":usertoken}).pipe(map((res: any)=>res));
  }
  get_user_ratings(ratemonth){
    var headers= new Headers();
    headers.append('Content-Type','application/X-www-form=urlencoded');
    return this.http.post(this.rootapi+"Report/get_user_ratings",{"ratemonth":ratemonth}).pipe(map((res: any)=>res));
  }
}
