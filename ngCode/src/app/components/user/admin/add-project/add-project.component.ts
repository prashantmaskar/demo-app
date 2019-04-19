import { Component, OnInit } from '@angular/core';
import{FormBuilder,FormGroup, FormControl, Validators} from '@angular/forms';
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import {MatSnackBar} from '@angular/material';
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import {ProjectService} from '../../../../services/project.service';
import { AdminService } from '../../../../services/admin.service';
@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.styl'],
  providers: [DatePipe]
})
export class AddProjectComponent implements OnInit {
  projectForm:FormGroup;
  clients:clients[];
  error_message="";
  projectname:string;
  projectshort:string;
  clientname:number;
  usertoken:string;
  error:boolean=false;
  mySelect:any;
  titleAlert:string = 'This Field is Required';
  user_name:string;
  today: string;
  todays: number;
  constructor(private formBuilder:FormBuilder,private ProjectService:ProjectService,private AdminService:AdminService,private route: ActivatedRoute,private router: Router,private datePipe: DatePipe,public snackBar: MatSnackBar,private titleService: Title) {
    this.projectForm=formBuilder.group({
      "projectname":[null, Validators.required],
      "clientname":[null,Validators.required],
      "projectshort":[null,Validators.required]
    });

    this.get_client_list();
    this.mySelect = -1;
    this.usertoken=localStorage.getItem('auth-key');
   }
   colors = [
    {
      name: 'Red',
      value: '#ff3300'
    },
    {
      name: 'Orange',
      value: '#ffa500'
    },
    {
      name: 'Green',
      value: '#008000'
    }
  ];
  selectedColor = '';
  ngOnInit() {
    this.titleService.setTitle("CDE - Add Goals");
    this.user_name = localStorage.getItem('user_name');	
    this.todays 
    this.todays = new Date().getMonth();
  }
  onChange(e:any,value){
    // console.log(e.source.id);
    // this.selectedColor = value;
    (document.querySelector('#'+e.source.id) as HTMLElement).style.backgroundColor = value;
  }
  get_client_list(){
    this.AdminService.get_client_list().subscribe((clinet_list:clients[])=>{
      this.clients=clinet_list;
    });
  }

  add_project(post){
    this.projectname=post.projectname;
    this.clientname=post.clientname;
    this.projectshort=post.projectshort;
    this.usertoken = localStorage.getItem('auth-key');
    this.ProjectService.add_project(this.projectname,this.clientname,this.usertoken,this.projectshort).subscribe(project=>{
    
          
       if(project==true){
        this.snackBar.open('Project Added Sucessfully', 'close', {
          duration: 2000,
          verticalPosition: 'top'
        });
        this.projectForm.reset();
        this.projectForm=this.formBuilder.group({
          "projectname":[null, Validators.required],
          "clientname":[-1,Validators.required],
          "projectshort":[null,Validators.required]
        });
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
interface clients{
  c_name:string,
  id:number
}