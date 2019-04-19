import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs/operators';
import {ProjectService} from '../../../../services/project.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.styl']
})
export class ProjectListComponent implements OnInit {
  projects:projects[];
  //feedback_ques:feedback_ques[];
  post:any;
  usertoken:string;
  user_role:string;
  show:boolean = false;
  constructor(
    private ProjectService:ProjectService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private spinner: NgxSpinnerService
    ) { 
    this.get_project_list();
    //this.get_project_feedback();
    this.user_role = localStorage.getItem('user_role');
    if(this.user_role != '2'){
   
   this.show= this.show;
   
    }
    else{
      this.show = !this.show;
      
    }
    this.user_role = localStorage.getItem('user_role');
  }

  ngOnInit() {
    this.titleService.setTitle("CDE - Project list");
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
  }, 5000);
  }
  get_project_list(){
    this.usertoken = localStorage.getItem('auth-key');
    this.ProjectService.get_feedback_project_list(this.usertoken).subscribe(projects=>{
      this.projects = projects;
      // let array = [1,2,3];
      // for (let i = 0; i < projects.length; i++) {
      //   console.log(array[i]);
      // }
   
    });
  }
// get_project_feedback(){
  
//   this.ProjectService.get_project_feedback().subscribe(feedback_ques=>{
//     this.feedback_ques = feedback_ques;

//   });
// }
}
interface projects{
  name:string,
  c_name:string,
  proj_id:number,
  c_logo:string,
  shortform:string,
  project_score:any
}