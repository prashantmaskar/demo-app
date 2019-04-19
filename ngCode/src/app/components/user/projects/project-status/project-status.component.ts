import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../../../services/project.service';
import{Location} from '@angular/common';
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-project-status',
  templateUrl: './project-status.component.html',
  styleUrls: ['./project-status.component.styl']
})
export class ProjectStatusComponent implements OnInit {

  feedback_ques:feedback_ques[];
  projects:projects[];
  ticketlist:ticketlist[];
  post:any;
  usertoken:string;
  //proj_score:any;
  constructor(private ProjectService:ProjectService,private location: Location,private titleService: Title) { 
    this.get_project_feedback();
    this.get_project_list();
  }

  ngOnInit() {
    this.titleService.setTitle("CDE - Project status");
  }
  goBack() {
    this.location.back();
  }
  projectScore(proid){
    console.log(proid);
    //  this.ProjectService.get_project_score(proid).subscribe(score=>{
    //     console.log(score);
    //    // this.proj_score = score;
    //  });    
  }
  get_project_feedback(){
  
    this.ProjectService.get_project_feedback().subscribe(feedback_ques=>{
      this.feedback_ques = feedback_ques;
  
    });
}

get_project_list(){
  this.usertoken = localStorage.getItem('auth-key');
  this.ProjectService.get_feedback_project_list(this.usertoken).subscribe(projects=>{
    this.projects = projects;
    // let array = [1,2,3];
    // for (let i = 0; i < projects.length; i++) {
    //   console.log(array[i]);
    // }
    console.log(this.projects);
  });
}
onChange(project_id) {
  console.log(project_id);
}
get_task_lists(project_id){
  
  this.ProjectService.get_task_lists(project_id).subscribe((task_list:ticketlist[])=>{
    this.ticketlist = task_list;

  });
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