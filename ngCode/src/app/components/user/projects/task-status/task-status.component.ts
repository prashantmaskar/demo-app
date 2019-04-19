import { Component, OnInit, Inject } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import{Location} from '@angular/common';
import { Title } from '@angular/platform-browser';
import {ProjectService} from '../../../../services/project.service';
import {MatBottomSheet, MatBottomSheetRef,MAT_BOTTOM_SHEET_DATA} from '@angular/material';

@Component({
  selector: 'app-task-status',
  templateUrl: './task-status.component.html',
  styleUrls: ['./task-status.component.styl']
})
export class TaskStatusComponent implements OnInit {
  display="none";
  displayDetails="none";
  feedback_ques:feedback_ques[];
  feedback_details:feedback_details[];
  projects:projects[];
  ticketlist:ticketlist[];
  taskdrfdata:taskdrfdata[];
  post:any;
  usertoken:string;
  taskname:string;
  p_id:number;
  scores:number;
  feed_date:string;
  feed_task:string;
  feed_by:string;
  feed_score:number;
  feed_additional_comment:string;
  constructor(private ProjectService:ProjectService,private route: ActivatedRoute,private bottomSheet: MatBottomSheet,private location: Location,private titleService: Title) { 
    this.route.params.subscribe( params => 
      
      this.p_id =params['proj_id']
      );
    this.get_project_feedback();
    this.get_task_lists(this.p_id);
  }

  ngOnInit() {
    this.titleService.setTitle("CDE - Task Status");
  }
  goBack() {
    this.location.back();
  }
  openBottomSheet(taskid): void {
    this.bottomSheet.open(BottomSheetOverviewExampleSheet,{
      data: {task_id:taskid}
    });
    
  }
  openDetails(score,taskid){
    
    this.ProjectService.get_task_drf_list(taskid).subscribe((task_drf_list:taskdrfdata[])=>{
      this.taskdrfdata = task_drf_list;
      console.log(this.taskdrfdata);
      this.taskname = this.taskdrfdata[0].task_name;
      this.scores = score
    });   
    this.display="block"; 
  }
  showInDetails(feedbackid){
    console.log(feedbackid);
    
    this.ProjectService.get_task_drf_details(feedbackid).subscribe((feedback_details:feedback_details[])=>{
      this.feedback_details = feedback_details;
      console.log(this.feedback_details);
      this.feed_task = this.feedback_details[1].task_name;
      this.feed_by = this.feedback_details[1].feedback_by;
      this.feed_date = this.feedback_details[1].feedback_date;
      this.feed_score = this.feedback_details[1].score;
      this.feed_additional_comment = this.feedback_details[1].additional_comment;
    });
    this.display="none";
    this.displayDetails="block";      
  }
  
  closeDetails(){
    this.display="none";
    this.displayDetails="none";
  }
  goBackDetails() {
    this.display="block";
    this.displayDetails="none";
  }
  get_project_feedback(){
  
    this.ProjectService.get_project_feedback().subscribe(feedback_ques=>{
      this.feedback_ques = feedback_ques;
  
    });
}

get_project_list(){
  this.usertoken = localStorage.getItem('auth-key');
  this.ProjectService.get_project_list(this.usertoken).subscribe(projects=>{
    this.projects = projects;

  });
}
onChange(project_id) {
  console.log(project_id);
}
get_task_lists(p_id){
  this.ProjectService.get_task_lists(p_id).subscribe((task_list:ticketlist[])=>{
    this.ticketlist = task_list;

  });
}
}

@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  templateUrl: 'task-detail.html',
})
export class BottomSheetOverviewExampleSheet {
  ticketlist:ticketlist[];
  taskdrfdata:taskdrfdata[];
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any,private ProjectService:ProjectService,private bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>) {
    
  }
  ngOnInit() {
    this.openSheet();
  }
  openSheet(){
    this.ProjectService.get_task_drf_list(this.data.task_id).subscribe((task_drf_list:taskdrfdata[])=>{
      this.taskdrfdata = task_drf_list;
      console.log(this.taskdrfdata);

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
interface taskdrfdata{
  drf_date:string,
  score:string,
  task_id:number,
  task_name:string
}
interface feedback_details{
  feedback_date:string;
  feed_que:string;
  feed_rate:number;
  score:number;
  task_name:string;
  feedback_by:string;
  additional_comment:string;
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

