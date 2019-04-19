import { Component, OnInit } from '@angular/core';
import { AdminService } from "../../../../services/admin.service";
import{MonthName} from '../my-ratings/monthname.pipe'
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-my-ratings',
  templateUrl: './my-ratings.component.html',
  styleUrls: ['./my-ratings.component.styl'],
  providers: [MonthName]
})
export class MyRatingsComponent implements OnInit {
  display="none";
  user_role: any;
  usertoken: string;
  additional_comment:string;
  rmonth:number;
  ryear:number;
  rrating:number;
  rating_list:rating_list[];
  rating_details:rating_details[];
  constructor(private AdminService: AdminService,private titleService: Title) {
  this.user_role = localStorage.getItem("user_role"); 
  this.usertoken = localStorage.getItem("auth-key"); 
   }

  ngOnInit() {
    this.titleService.setTitle("CDE - My Ratings");
    this.get_user_monthly_avg_rating();
  }

showInDetails(rating_id){
console.log(rating_id);
this.AdminService.get_user_rating_details_by_id(rating_id).subscribe(
  (rating_details: rating_details[]) => {
    this.rating_details = rating_details;
    this.additional_comment = rating_details[0].additional_comment;
    this.rmonth = rating_details[0].month;
    this.ryear= rating_details[0].year;
    this.rrating = rating_details[0].avg_rating;
  }
);
    this.display="block"; 
  }
  closeDetails(){
    this.display="none";
  }
  get_user_monthly_avg_rating(){
    this.AdminService.get_user_monthly_avg_rating(this.usertoken).subscribe(
      (rating_list: rating_list[]) => {
        this.rating_list = rating_list;
       
        console.log(this.rating_list);
      }
    );
  }

}
interface rating_list{
month:number,
year:number,
avg_rating:number,
rating_id:number
}
interface rating_details{
  title:string,
  description:string,
  rating:number,
  comment:string,
  month:number,
  year:number,
  avg_rating:number,
  additional_comment:string
}