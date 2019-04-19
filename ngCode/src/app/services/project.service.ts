import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpEvent} from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import{ environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  rootapi=environment.baseUrl;
  isloggedin:boolean=false;
  constructor(private http: HttpClient) { }
  setLoggedin(logged){
    this.isloggedin=logged;
  }

add_project(projectname,clientname,usertoken,projectshort){
    var headers= new Headers();
    headers.append('Content-Type','application/X-www-form=urlencoded');
    // console.log("connected Login11");
    return this.http.post(this.rootapi+"project/add_project",{"projectname":projectname,"clientname":clientname,"usertoken":usertoken,"shortform":projectshort}).pipe(map((res: any)=>res));

  }

  get_project_list(usertoken){
    var headers= new Headers();
    headers.append('Content-Type','application/X-www-form=urlencoded');
    return this.http.post(this.rootapi+"feedback/get_project_list",{"usertoken":usertoken}).pipe(map((res: any)=>res));
  }
  get_feedback_project_list(usertoken){
    var headers= new Headers();
    headers.append('Content-Type','application/X-www-form=urlencoded');
    return this.http.post(this.rootapi+"feedback/get_project_list",{"usertoken":usertoken}).pipe(map((res: any)=>res));
  }  

  get_pteam_list(p_id,usertoken){
    var headers= new Headers();
    headers.append('Content-Type','application/X-www-form=urlencoded');
    return this.http.post(this.rootapi+"project/get_project_team",{"p_id":p_id,"usertoken":usertoken}).pipe(map((res: any)=>res));
  }
  get_nteam_list(p_id,usertoken){
    var headers= new Headers();
    headers.append('Content-Type','application/X-www-form=urlencoded');
    return this.http.post(this.rootapi+"project/get_project_non_team_members",{"p_id":p_id,"usertoken":usertoken}).pipe(map((res: any)=>res));

  }
  add_mem_tem(p_id,teammembers,usertoken){
    var headers= new Headers();
    headers.append('Content-Type','application/X-www-form=urlencoded');
    return this.http.post(this.rootapi+"project/add_member_to_project",{"p_id":p_id,"teammembers":teammembers,"usertoken":usertoken}).pipe(map((res: any)=>res)); 
  }

  del_tmember(project_id,user_id,usertoken){
    var headers= new Headers();
    headers.append('Content-Type','application/X-www-form=urlencoded');
    
    return this.http.post(this.rootapi+"project/remove_member_from_project",{"project_id":project_id,"user_id":user_id,"usertoken":usertoken}).pipe(map((res: any)=>res));
  }

getproject_info(project_id,usertoken){
  var headers= new Headers();
  headers.append('Content-Type','application/X-www-form=urlencoded');
  return this.http.post(this.rootapi+"project/get_project_details",{"project_id":project_id,"usertoken":usertoken}).pipe(map((res: any)=>res));
}
Del_Project(project_id,usertoken){
  var headers= new Headers();
  headers.append('Content-Type','application/X-www-form=urlencoded');
  return this.http.post(this.rootapi+"project/delete_project",{"project_id":project_id,"usertoken":usertoken}).pipe(map((res: any)=>res));
}
update_project(proj_id,client,proj_name,shortform,usertoken){
var headers= new Headers();
headers.append('Content-Type','application/X-www-form=urlencoded');
return this.http.post(this.rootapi+"project/update_project",{"shortform":shortform,"projectname":proj_name,"project_id":proj_id,"clientname":client,"usertoken":usertoken}).pipe(map((res: any)=>res));
}

//add task function
add_task(project_id,taskname,taskdesc,taskscdate,taskecdate,member,estimated_hours,actual_hours,rework_hours,usertoken){
  var headers= new Headers();
  headers.append('Content-Type','application/X-www-form=urlencoded');
  console.log(estimated_hours);
  return this.http.post(this.rootapi+"task/create_task",{"project_id":project_id,"taskname":taskname,"taskdesc":taskdesc,"taskscdate":taskscdate,"taskecdate":taskecdate,"member":member,"estimated_hours":estimated_hours,"actual_hours":actual_hours,"rework_hours":rework_hours,"usertoken":usertoken}).pipe(map((res: any)=>res));
}
//get the task list
get_task_list(project_id){
  var headers= new Headers();
  headers.append('Content-Type','application/X-www-form=urlencoded');
  return this.http.post(this.rootapi+"task/task_dashboard_listing",{"project_id":project_id}).pipe(map((res: any)=>res));
}
//get task columns
get_stscolumn_list(){
  var headers= new Headers();
  headers.append('Content-Type','application/X-www-form=urlencoded');
  
  return this.http.get(this.rootapi+"task/get_task_column_list").pipe(map((res: any)=>res));
}
get_task_user_username(p_id){
  var headers= new Headers();
  headers.append('Content-Type','application/X-www-form=urlencoded');
  return this.http.post(this.rootapi+"task/get_task_user_username",{"project_id":p_id}).pipe(map((res: any)=>res));
}
//project score
get_project_score(projid){
  var headers= new Headers();
  headers.append('Content-Type','application/X-www-form=urlencoded');
  return this.http.post(this.rootapi+"feedback/get_project_score",{"project_id":projid}).pipe(map((res: any)=>res));  
}
//get task details
get_task_details(taskid){
  var headers= new Headers();
  headers.append('Content-Type','application/X-www-form=urlencoded');
  return this.http.post(this.rootapi+"task/get_task_details",{"task_id":taskid}).pipe(map((res: any)=>res));
}
update_task(p_id,task_id,taskname,taskdesc,taskscdate,taskecdate,emember,status,estimated_hours,actual_hours,rework_hours,usertoken){
  var headers= new Headers();
  headers.append('Content-Type','application/X-www-form=urlencoded');
  
  return this.http.post(this.rootapi+"task/update_task",{"project_id":p_id,"ticket_id":task_id,"taskname":taskname,"taskdesc":taskdesc,"taskscdate":taskscdate,"taskecdate":taskecdate,"member":emember,"status":status,"estimated_hours":estimated_hours,"actual_hours":actual_hours,"rework_hours":rework_hours,"usertoken":usertoken}).pipe(map((res: any)=>res));
}
update_task_status(project_id,ticket_id,status,usertoken){
  var headers= new Headers();
  headers.append('Content-Type','application/X-www-form=urlencoded');
  return this.http.post(this.rootapi+"task/update_task_status",{"project_id":project_id,"ticket_id":ticket_id,"status":status,"usertoken":usertoken}).pipe(map((res: any)=>res));
}
//add commnet
add_commnet(p_id,task_id,taskcomment,usertoken){
  var headers= new Headers();
  headers.append('Content-Type','application/X-www-form=urlencoded');
  
  return this.http.post(this.rootapi+"task/add_comment",{"project_id":p_id,"ticket_id":task_id,"taskcomment":taskcomment,"usertoken":usertoken}).pipe(map((res: any)=>res));
}
update_comment(comment_id,p_id,task_id,taskcomment,usertoken){
  var headers= new Headers();
  headers.append('Content-Type','application/X-www-form=urlencoded');
  return this.http.post(this.rootapi+"task/update_comment",{"comment_id":comment_id,"project_id":p_id,"ticket_id":task_id,"taskcomment":taskcomment,"usertoken":usertoken}).pipe(map((res: any)=>res));
}
get_commnets(task_id){
  var headers= new Headers();
  headers.append('Content-Type','application/X-www-form=urlencoded');
  return this.http.post(this.rootapi+"task/get_task_comments",{"task_id":task_id}).pipe(map((res: any)=>res));
}
//feedback functions
add_feedback(p_id,task_id,taskfeedback,usertoken){
  var headers= new Headers();
  headers.append('Content-Type','application/X-www-form=urlencoded');
  
  return this.http.post(this.rootapi+"task/add_feedback",{"project_id":p_id,"ticket_id":task_id,"taskfeedback":taskfeedback,"usertoken":usertoken}).pipe(map((res: any)=>res));
}
update_feedback(feedback_id,p_id,task_id,taskfeedback,usertoken){
  var headers= new Headers();
  headers.append('Content-Type','application/X-www-form=urlencoded');
  return this.http.post(this.rootapi+"task/update_feedback",{"feedback_id":feedback_id,"project_id":p_id,"ticket_id":task_id,"taskfeedback":taskfeedback,"usertoken":usertoken}).pipe(map((res: any)=>res));
}
get_feedbacks(task_id){
  var headers= new Headers();
  headers.append('Content-Type','application/X-www-form=urlencoded');
  return this.http.post(this.rootapi+"task/get_task_feedbacks",{"task_id":task_id}).pipe(map((res: any)=>res));
}
del_task(task_id,p_id,usertoken){
  var headers= new Headers();
  headers.append('Content-Type','application/X-www-form=urlencoded');
  return this.http.post(this.rootapi+"task/delete_task",{"task_id":task_id,"project_id":p_id,"usertoken":usertoken}).pipe(map((res: any)=>res));
}

//file uplaod function

uploadFile(file: File,p_id,task_id,token_id): Observable<HttpEvent<any>> {

  let formData = new FormData();
  formData.append('upload', file);
  formData.append('project_id', p_id);
  formData.append('ticket_id', task_id);
  formData.append('usertoken',token_id);

  let params = new HttpParams();

  const options = {
    params: params,
    reportProgress: true,
  };
  console.log(formData );
  const req = new HttpRequest('POST', this.rootapi+"task/add_attachment", formData, options);
  console.log(req);
  return this.http.request(req);
}

del_comment(commant_id,task_id,project_id,usertoken){
  var headers= new Headers();
  headers.append('Content-Type','application/X-www-form=urlencoded');
  return this.http.post(this.rootapi+"task/delete_comment",{"project_id":project_id,"task_id":task_id,"comment_id":commant_id,"usertoken":usertoken}).pipe(map((res: any)=>res));
}
del_feedback(feedback_id,task_id,project_id,usertoken){
  var headers= new Headers();
  headers.append('Content-Type','application/X-www-form=urlencoded');
  return this.http.post(this.rootapi+"task/delete_feedback",{"project_id":project_id,"task_id":task_id,"feedback_id":feedback_id,"usertoken":usertoken}).pipe(map((res: any)=>res));
}
get_attchments(task_id){
  var headers= new Headers();
  headers.append('Content-Type','application/X-www-form=urlencoded');
  
  return this.http.post(this.rootapi+"task/get_attachment_list",{"task_id":task_id}).pipe(map((res: any)=>res));
}
delete_attachment(attachment_id,task_id,project_id,usertoken){
  var headers= new Headers();
  headers.append('Content-Type','application/X-www-form=urlencoded');
  return this.http.post(this.rootapi+"task/delete_attachment",{"project_id":project_id,"task_id":task_id,"attachment_id":attachment_id,"usertoken":usertoken}).pipe(map((res: any)=>res));
}

get_project_feedback(){
  var headers= new Headers();
  headers.append('Content-Type','application/X-www-form=urlencoded');
  return this.http.get(this.rootapi+"feedback/get_feedback_questions").pipe(map((res: any)=>res));
}
get_user_rating_criterias(){
  var headers= new Headers();
  headers.append('Content-Type','application/X-www-form=urlencoded');
  return this.http.get(this.rootapi+"associate_rating/get_user_rating_criterias").pipe(map((res: any)=>res));
}
get_task_lists(project_id){
  var headers= new Headers();
  headers.append('Content-Type','application/X-www-form=urlencoded');
  return this.http.post(this.rootapi+"feedback/get_project_tasks",{"project_id":project_id}).pipe(map((res: any)=>res));
}
get_task_drf_list(task_id){
  var headers= new Headers();
  headers.append('Content-Type','application/X-www-form=urlencoded');
  return this.http.post(this.rootapi+"feedback/get_task_drf_list",{"task_id":task_id}).pipe(map((res: any)=>res));
}
get_task_drf_details(feedbackid){
  var headers= new Headers();
  headers.append('Content-Type','application/X-www-form=urlencoded');
  return this.http.post(this.rootapi+"feedback/get_task_drf_details",{"feedback_id":feedbackid}).pipe(map((res: any)=>res));
}

addfeedback(feedbackForm){
  var headers= new Headers();
  headers.append('Content-Type','application/X-www-form=urlencoded');
  return this.http.post(this.rootapi+"feedback/insert_client_feedback",feedbackForm).pipe(map((res: any)=>res));
}
fn_update_user_project_role(project_id,usertoken,member_id,member_type){
  var headers= new Headers();
  headers.append('Content-Type','application/X-www-form=urlencoded');
  return this.http.post(this.rootapi+"project/fn_update_user_project_role",{"project_id":project_id,"member_id":member_id,"member_type":member_type,"usertoken":usertoken}).pipe(map((res: any)=>res));
}
get_user_list(usertoken){
  var headers= new Headers();
  headers.append('Content-Type','application/X-www-form=urlencoded');
  return this.http.post(this.rootapi+"associate_rating/get_user_list",{"usertoken":usertoken}).pipe(map((res: any)=>res)); 
}
addassorate(assorateform){
  var headers= new Headers();
  headers.append('Content-Type','application/X-www-form=urlencoded');
  return this.http.post(this.rootapi+"Associate_rating/insert_update_associate_rating",assorateform).pipe(map((res: any)=>res));
}
get_users_with_rating(ratemonth,usertoken){
  var headers= new Headers();
  headers.append('Content-Type','application/X-www-form=urlencoded');
  return this.http.post(this.rootapi+"Associate_rating/get_users_with_rating",{"usertoken":usertoken,"ratemonth":ratemonth}).pipe(map((res: any)=>res));
}
get_user_rating_details(ratemonth,user_id){
  var headers= new Headers();
  headers.append('Content-Type','application/X-www-form=urlencoded');
  return this.http.post(this.rootapi+"Associate_rating/get_user_rating_details",{"associate_id":user_id,"ratemonth":ratemonth}).pipe(map((res: any)=>res));
}
chk_if_lead(usertoken){
  var headers= new Headers();
  headers.append('Content-Type','application/X-www-form=urlencoded');
  return this.http.post(this.rootapi+"project/fn_chk_if_lead",{"usertoken":usertoken}).pipe(map((res: any)=>res));
}

}
