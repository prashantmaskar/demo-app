import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../../services/project.service';
import { ExcelserviceService } from '../../../../services/excelservice.service';
import { Location } from '@angular/common';
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import {FormControl} from '@angular/forms';
import { MatDatepickerInputEvent, MatDatepicker } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';

type Moment = moment.Moment;
const moment1 = moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MMM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-associates-feedback',
  templateUrl: './associates-feedback.component.html',
  styleUrls: ['./associates-feedback.component.styl'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    DatePipe
  ],
})
export class AssociatesFeedbackComponent implements OnInit {

  feedback_ques: feedback_ques[];
  projects: projects[];
  ticketlist: ticketlist[];
  rate_user_list: rate_user_list[];
  post: any;
  usertoken: string;
  ratemonths: any;
  ratemonth:FormControl;
  //proj_score:any;
  constructor(private ProjectService: ProjectService,private ExcelserviceService: ExcelserviceService,  private location: Location, private datePipe: DatePipe,private route: ActivatedRoute,private titleService: Title ) {
    this.get_project_feedback();
    this.get_project_list();
    this.usertoken = localStorage.getItem('auth-key');
    this.ratemonth = new FormControl( moment());
 
  }

  ngOnInit() {
    this.titleService.setTitle("CDE - Associates Feedback");
    this.ratemonths = Date.now();
    this.ratemonths = this.datePipe.transform(this.ratemonths, 'yyyy-MM ');
    this.get_users_with_rating(this.usertoken);

  }

  goBack() {
    this.location.back();
  }
  projectScore(proid) {
    //  this.ProjectService.get_project_score(proid).subscribe(score=>{
    //     console.log(score);
    //    // this.proj_score = score;
    //  });    
  }
  get_project_feedback() {

    this.ProjectService.get_project_feedback().subscribe(feedback_ques => {
      this.feedback_ques = feedback_ques;

    });

  }
  get_project_list() {
    this.usertoken = localStorage.getItem('auth-key');
    this.ProjectService.get_feedback_project_list(this.usertoken).subscribe(projects => {
      this.projects = projects;
  
    });
  }
  onChange(project_id) {
    console.log(project_id);
  }
  get_task_lists(project_id) {

    this.ProjectService.get_task_lists(project_id).subscribe((task_list: ticketlist[]) => {
      this.ticketlist = task_list;

    });
  }
  get_users_with_rating(usertoken) {
    this.ProjectService.get_users_with_rating(this.ratemonths, usertoken).subscribe((rate_user_list: rate_user_list[]) => {
      this.rate_user_list = rate_user_list;
    });
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.ratemonth.value;
    ctrlValue.year(normalizedYear.year());
    this.ratemonth.setValue(ctrlValue);
  }

  chosenMonthHandler(normlizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.ratemonth.value;
    ctrlValue.month(normlizedMonth.month());
    this.ratemonth.setValue(ctrlValue);
    datepicker.close();
    this.ratemonths = this.datePipe.transform(ctrlValue._d, 'yyyy-MM ');
    this.get_users_with_rating(this.usertoken);
    

 
  }
  exportAsXLSX():void {
    this.ExcelserviceService.exportAsExcelFile(this.rate_user_list, 'Associate-Rating');
  }
}
interface feedback_ques {
  que_name: string,
  que_id: number,
  que_pos: number,

}
interface projects {
  name: string,
  c_name: string,
  proj_id: number,
  c_logo: string
}
export interface ticketlist {
  column_id: number;
  created_by: number;
  description: string;
  name: string;
  slug: string;
  proj_id: number;
  ticket_id: number;
  start_date: string;
  end_date: string;
  members: string;
};
interface rate_user_list {
  first_name: string,
  last_name: string,
  rating: number,
  user_id: number,

}
