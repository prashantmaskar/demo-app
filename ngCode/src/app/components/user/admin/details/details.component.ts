import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { AdminService } from '../../../../services/admin.service';
import {MatSnackBar,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition} from '@angular/material';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.styl']
})
export class DetailsComponent implements OnInit {
designsForm: FormGroup;
post: any;
uid:number;
detail:string;
first_name:string;
last_name:string;
email:string;
password:string;
usertoken:string;
error:boolean=false;
error_message="";
isActiveDiv:false;
details: details[];
titleAlert: string = 'This Field is Required';
user_name:string;
user_role:any;
today: string;
todays: number;
  constructor(private formBuilder:FormBuilder,private AdminService:AdminService,public snackBar: MatSnackBar,private titleService: Title) { 
    this.first_name="";
    this.last_name="";
    this.email="";

    this.designsForm=formBuilder.group({
          
      "first_name":[null, Validators.required],
      "last_name":[null, Validators.required],
      "email":[null, Validators.required],
      
    });
    this.get_detail();
  }

  ngOnInit() {
    this.titleService.setTitle("CDE - Goals Details");
    this.user_name = localStorage.getItem('user_name');	
    this.user_role = localStorage.getItem('user_role');
    this.todays 
    this.todays = new Date().getMonth();
  }
  add_detail(post){
    this.detail=post.detail;
    this.usertoken=localStorage.getItem('auth-key');
    this.AdminService.add_detail(this.detail,this.usertoken,).subscribe(
      detail=>{
          if(detail.req_status=='1'){
            this.snackBar.open('Details Added Sucessfully', 'close', {
              duration: 2000,
              verticalPosition: 'top'
            });
          }
          else
          {
            this.error=true;
            this.error_message = detail.message;
          }
          this.AdminService.setLoggedin(false);
      },
      error=>{
        this.error=!this.error;
        this.error_message="Details Not Added";
        console.log(this.error_message);
      }
    );
  }
  update_details(post){
    this.uid=post.uid;
    this.first_name=post.first_name;
    this.last_name=post.last_name;
    this.email=post.email;
    this.usertoken=localStorage.getItem('auth-key');
    this.AdminService.update_details(this.uid,this.usertoken,this.first_name,this.last_name,this.email).subscribe(
      detail=>{
        
          if(detail.req_status=='1'){
            this.snackBar.open('Details Updated Sucessfully', 'close', {
              duration: 2000,
              verticalPosition: 'top'
            });
          }
          else
          {
            this.error=true;
            this.error_message = detail.message;
          }
          this.AdminService.setLoggedin(false);
      },
      error=>{
        this.error=!this.error;
        this.error_message="Details Not Added";
        console.log(this.error_message);
      }
    );
  }
  get_detail(){
    this.usertoken=localStorage.getItem('auth-key');
    this.AdminService.get_detail(this.usertoken).subscribe((data_detail:details[])=>{
      this.details=data_detail;
      this.designsForm=this.formBuilder.group({
          
        "first_name":[this.details[0].first_name, Validators.required],
        "last_name":[this.details[0].last_name, Validators.required],
        "email":[this.details[0].email, Validators.required],
        
      });
    });
  }

}
interface details{
  first_name:string;
  last_name:string;
  email:string;
  password:string;
  detail:string;
  uid:number;
}