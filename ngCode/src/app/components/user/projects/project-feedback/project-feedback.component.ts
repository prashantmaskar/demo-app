import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs/operators';
import{Location} from '@angular/common';
import{FormBuilder,FormGroup, FormControl, Validators} from '@angular/forms';
import {MatSnackBar,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition} from '@angular/material';
import {ProjectService} from '../../../../services/project.service';
@Component({
  selector: 'app-project-feedback',
  templateUrl: './project-feedback.component.html',
  styleUrls: ['./project-feedback.component.styl']
})
export class ProjectFeedbackComponent implements OnInit {
  feedback_ques:feedback_ques[];
  member:FormControl;
  projects:projects[];
  ticketlist:ticketlist[];
  post:any;
  usertoken:string;
  todays:number;
  p_id:any;
  t_id:any;
  public project: FormControl = new FormControl();
  public tasks: FormControl = new FormControl();
  selected:number;
  feedbackForm:FormGroup;
  error:boolean=false;
  titleAlert:string = 'This Field is Required';
  error_message="";
  activatedRoute: any;
  constructor(
    private ProjectService:ProjectService,
    private route: ActivatedRoute,
    private formBuilder:FormBuilder,
    public snackBar: MatSnackBar,
    private location: Location,
    private router: Router,
    private titleService: Title
    ) { 
    this.get_project_feedback();
    this.get_project_list();
    this.todays = Date.now();
  
    this.route.queryParams
    .pipe(params => params)
    .subscribe(params => {
    this.p_id =params.project,
    this.t_id = params.task
 
      
    });
    this.feedbackForm = formBuilder.group({ 
      // "project":['',Validators.required],
      "qcomment":['']
       });


  }

  ngOnInit() {
   
    this.onChange(this.p_id);
    this.project.setValue(this.p_id);
    this.tasks.setValue(this.t_id);

   this.titleService.setTitle("CDE - Project feedback");
  }
  goBack() {
    console.log(this.location);
    this.location.back();
  }
  ngAfterViewInit() {

  }
 
  get_project_feedback(){
  
    this.ProjectService.get_project_feedback().subscribe(feedback_ques=>{
      this.feedback_ques = feedback_ques;
      
      const formGroup = {};
      for(let id of feedback_ques) {
        formGroup['q'+ id.id] = new FormControl('', Validators.required);
        formGroup['qc'+ id.id] = new FormControl('');
      }
      
      //  formGroup['project'] = new FormControl('', Validators.required);
       formGroup['qcomment'] = new FormControl('');
      //  console.log(formGroup);
      this.feedbackForm = new FormGroup(formGroup);
  
    });
}

get_project_list(){
  this.usertoken = localStorage.getItem('auth-key');
  this.ProjectService.get_feedback_project_list(this.usertoken).subscribe(projects=>{
    this.projects = projects;
  if(typeof this.p_id != 'undefined'){
    this.project.setValue(this.p_id);
    this.tasks.setValue(this.t_id);
  }else{
    this.project.setValue(this.projects[0].proj_id);
    this.onChange(this.projects[0].proj_id);
  }
  
  });

 

}
onChange(project_id) {
  this.get_task_lists(project_id);
}
get_task_lists(project_id){
  
  this.ProjectService.get_task_lists(project_id).subscribe((task_list:ticketlist[])=>{
    this.ticketlist = task_list;
    if(typeof this.t_id != 'undefined'){
      this.project.setValue(this.p_id);
      this.tasks.setValue(this.t_id);
    }else{
    
      this.tasks.setValue( this.ticketlist[0].ticket_id);
    }
  });
  
}
feedback(feedbackForm){
  let otherinfo = {
    "project_id": this.project.value,
    "task_id":this.tasks.value,
    "usertoken":this.usertoken
  };

  Object.assign(feedbackForm, otherinfo);
  // console.log(feedbackForm);
  this.ProjectService.addfeedback(feedbackForm).subscribe(project=>{
    if(project.req_status=='1'){
     this.snackBar.open('Feedback Added Sucessfully', 'close', {
       duration: 2000,
       verticalPosition: 'top'
     });
     this.feedbackForm.reset();
    }
    else{
     this.error=true;
     this.error_message = project.message ;
   }
  this.ProjectService.setLoggedin(false);

},
error=>{
  this.error=!this.error;
  this.error_message="Your Credentials Do not Match";
  console.log(this.error_message);
}
); 
}
}
interface feedback_ques{
  que_name:string,
  que_id:number,
  que_pos:number,
 
}
interface projects{
  name:string,
  c_name:string,
  proj_id:number,
  c_logo:string
}
export interface ticketlist{
  column_id:number;
  created_by:number;
  description:string;
  name:string;
  slug:string;
  proj_id:number;
  ticket_id:number;
  start_date:string;
  end_date:string;
  members:string;
};