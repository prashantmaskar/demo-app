import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute,Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';

import { ProjectService } from '../../../../../services/project.service';
import * as _moment from 'moment';
import { Moment } from 'moment';
// tslint:disable-next-line:no-duplicate-imports
// import {default as _rollupMoment, Moment} from 'moment';

// const moment = _rollupMoment || _moment;
const moment = _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'MMM/YYYY',
  },
  display: {
    dateInput: 'MMM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-feedback-ratings',
  templateUrl: './feedback-ratings.component.html',
  styleUrls: ['./feedback-ratings.component.styl'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    DatePipe
  ],
})
export class FeedbackRatingsComponent implements OnInit {
  dateFeedback: any = "";
  usertoken: string;
  today: any;
  user_id: any;
  assorateform: FormGroup;
  rating_criterias: rating_criterias[];
  ratingformnames: any[] = [];
  userlist: userlist[];
  error: boolean = false;
  titleAlert: string = 'This Field is Required';
  error_message = "";
  selectedDate: any;
  minDate: Date;
  maxDate: Date;
  updated_date:Date;
  changed_date: any;
  disabledbutton:boolean;
  public userid: FormControl = new FormControl();
  // @ViewChild('picker1') picker1;
  date = new FormControl(moment());
  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normlizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normlizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
    this.updated_date = ctrlValue._d;
    this.minDate.setMonth(this.minDate.getMonth() - 1);
    if(this.minDate > this.updated_date){

      this.disabledbutton = true;
      
    }
    else{
      this.disabledbutton = false;
    }
    this.addratings(ctrlValue,this.user_id);
    this.minDate.setMonth(this.minDate.getMonth() + 1);
  }
  constructor(private ProjectService: ProjectService,private location: Location,private formBuilder: FormBuilder,public snackBar: MatSnackBar,private datePipe: DatePipe,private route: ActivatedRoute,private router:Router,private titleService: Title) {
    this.assorateform = this.formBuilder.group({
      // "assoname":['', Validators.required],
      "ratemonth": ['', Validators.required],
      "rcomment": ['']
    });
    this.route.queryParams
    .pipe(params => params)
    .subscribe(params => {
     this.user_id = params.user_id;
     this.changed_date = params.date;
 
      
    });
    this.minDate = new Date();
    this.minDate.setMonth(this.minDate.getMonth() - 2);
    this.minDate = new Date (this.minDate);
    this.maxDate = new Date();
    this.get_user_rating_criterias();
    this.updated_date = new Date(this.changed_date);
    if(this.minDate > this.updated_date){
      this.disabledbutton = true;
    }
    this.minDate.setMonth(this.minDate.getMonth() + 1);
  }
  ngOnInit() {
    this.titleService.setTitle("CDE - Feedback Rating");
    this.usertoken = localStorage.getItem('auth-key');
    this.date.setValue(moment(this.changed_date));
    // this.date = new FormControl(moment(this.changed_date));
    this.get_user_list();
    this.userid.setValue(this.user_id);
    
  }
  ngAfterViewInit(){
    this.addratings(this.changed_date,this.user_id);
    
  }
  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2);
    // day  = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth].join("-");
  }
  get_user_list() {
    this.ProjectService.get_user_list(this.usertoken).subscribe(userlist => {
      this.userlist = userlist;
    });
  }
  get_user_rating_criterias() {
    this.ProjectService.get_user_rating_criterias().subscribe(rating_criterias => {
      this.rating_criterias = rating_criterias;

      const formGroup = {};
      for (let id of rating_criterias) {
        formGroup['r' + id.id] = new FormControl('', Validators.required);
        formGroup['rc' + id.id] = new FormControl('');
      }
      formGroup['ratemonth'] = new FormControl('');
      formGroup['rcomment'] = new FormControl('');

      this.assorateform = new FormGroup(formGroup);

    });

  }
  goBack() {
    this.location.back();
  }
  onSubmit(assorateform) {
    let otherinfo = {
      "usertoken": this.usertoken,
      "ratemonth": this.convert(this.date.value._d),
      "assoname": this.userid.value
    };
    Object.assign(assorateform, otherinfo);
    console.log(assorateform);
    this.ProjectService.addassorate(assorateform).subscribe(ratings => {
      if (ratings.req_status == '1') {
        this.snackBar.open(ratings.message, 'close', {
          duration: 1000,
          verticalPosition: 'top'
        });
        this.addratings(this.changed_date,this.user_id);
        this.router.navigate(['/user/associateFeedback']);
      }
      else {
        this.error = true;
        this.error_message = ratings.message;
      }
      this.ProjectService.setLoggedin(false);
      
    },
      error => {
        this.error = !this.error;
        this.error_message = "Rating Not Added Sucessfully";
      }
    );
  }
 

  onChange(user_id) {
    this.user_id = user_id;
    const ctrlValue = this.date.value;
    this.today = this.datePipe.transform(ctrlValue._d, 'yyyy-MM ');
     this.addratings(this.today,this.user_id);
  }
  addratings(changed_date,user_id) {
    this.changed_date = this.convert(changed_date);
    this.ProjectService.get_user_rating_details(this.changed_date, user_id).subscribe(rate_user_list => {
      const formGroup = {};
    if(rate_user_list.length > 0)
    {       for (let id of rate_user_list) {
        formGroup['r' + id.criteria_id] = new FormControl(id.rating, Validators.required);
        formGroup['rc' + id.criteria_id] = new FormControl(id.comment);
      }
      formGroup['ratemonth'] = new FormControl('');
      formGroup['rcomment'] = new FormControl(rate_user_list[0].additional_comment);
      this.assorateform = new FormGroup(formGroup);
    }
    else{
      this.get_user_rating_criterias();
    }
    
    });
  }

}
interface rating_criterias {
  titile: string,
  id: number,
  description: string,

}
interface userlist {
  first_name: string,
  last_name: string,
  user_id: number
}
