import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent, MatDatepicker } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import {FormControl} from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Title } from '@angular/platform-browser';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';
import { AdminService } from '../../../../services/admin.service';
import { ExcelserviceService } from '../../../../services/excelservice.service';
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
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.styl'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    DatePipe
  ],
})
export class ReportsComponent implements OnInit {
  user_role:any;
  post: any;
  usertoken: string;
  ratemonths: any;
  ratemonth:FormControl;
  rate_user_list: rate_user_list[];
  constructor(private AdminService: AdminService, private ExcelserviceService: ExcelserviceService,private datePipe: DatePipe,private titleService: Title) { 
    this.ratemonth = new FormControl( moment());
  }

  ngOnInit() {
    this.titleService.setTitle("CDE - Rating Reports");
    this.user_role = localStorage.getItem('user_role');
    this.ratemonths = Date.now();
    this.ratemonths = this.datePipe.transform(this.ratemonths, 'yyyy-MM ');
    this.get_users_rating_report(this.ratemonths);
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
     this.get_users_rating_report(this.ratemonths);
  }
  get_users_rating_report(ratemonth){
    this.AdminService.get_user_ratings(ratemonth).subscribe((rate_user_list: rate_user_list[]) => {
      this.rate_user_list = rate_user_list;
      console.log(this.rate_user_list.length);
    //   let user_ratereport= [];
    //   console
    //   for(let i=0; i <this.rate_user_list.length;i++)
    //  {
    //    console.log(user.first_name);
    //  }
    });
  }
  exportAsXLSX():void {
    this.ExcelserviceService.exportAsExcelFile(this.rate_user_list, 'Associate-Rating');
  }
}
interface rate_user_list{
  First_Name:string,
  Last_Name:string,
  Month:number,
  Year:number,
  Rating:number,
  Rating_By:string



}