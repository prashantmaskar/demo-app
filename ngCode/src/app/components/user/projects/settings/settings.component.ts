import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, FormControl, Validators} from '@angular/forms';
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import {MatSnackBar,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition} from '@angular/material';
import {MatDialog} from "@angular/material";
import { Title } from '@angular/platform-browser';

import {ConfirmationDialog} from '../../admin/confirm-dialog/confirmation-dialog.component';
import {ProjectService} from '../../../../services/project.service';
import {AdminService} from '../../../../services/admin.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.styl']
})
export class SettingsComponent implements OnInit {
  p_id:number;
  usertoken:string;
  projeditForm:FormGroup;
  public client: FormControl = new FormControl();
  show:boolean = false;
  user_role:string;
  selcolumnid:number;
  project_detail:project_detail[];
  clients:clients[];
  proj_id:number;
  proj_name:string;
  shortform:string;
  error:boolean=false;
  titleAlert:string = 'This Field is Required';
  error_message="";
  constructor(private ProjectService:ProjectService,private AdminService:AdminService,private formBuilder:FormBuilder,private route: ActivatedRoute,private router:Router,public snackBar: MatSnackBar,public dialog: MatDialog,private titleService: Title) { 

    this.route.parent.params.subscribe( params => 
      // console.log(params['project_id']);
      this.p_id =params['project_id']
      );
      this.projeditForm = formBuilder.group({ 
        "proj_name":[null,Validators.required],
        proj_id:this.p_id,
        client:this.client,
        "shortform":[null,Validators.required]
      });
this.get_client_list();
this.getproject_info();
this.user_role = localStorage.getItem('user_role');
if(this.user_role == '1'){
this.show = this.show;
}
else{
 this.show= !this.show;
}
  }

  ngOnInit() {
    this.titleService.setTitle("CDE - Project Settings");
  }
  get_client_list(){
    this.AdminService.get_client_list().subscribe((clnt_list:clients[])=>{
      this.clients=clnt_list;

    });
  }
  getproject_info(){
    this.usertoken = localStorage.getItem('auth-key');
    this.ProjectService.getproject_info(this.p_id,this.usertoken,).subscribe(proj_det=>{
    this.project_detail =proj_det;
    this.projeditForm = this.formBuilder.group({ 
      "proj_name":[this.project_detail[0].name,Validators.required],
      proj_id:this.p_id,
      client:this.client,
      "shortform":[this.project_detail[0].shortform,Validators.required]
    });
    this.client.setValue(this.project_detail[0].client_id);
  });
  }
  DelProj(proj_id){
    this.usertoken = localStorage.getItem('auth-key');
    this.ProjectService.Del_Project(proj_id,this.usertoken ).subscribe(proj_del=>{
      if(proj_del.req_status=='1'){
        this.snackBar.open('Project Deleted Successfully.', 'close', {
          duration: 2000,
          verticalPosition: 'top'
        });
        this.router.navigate(["/user"]);
       }
     
       });
  }
  openDialog(uid) {

    const dialogRef = this.dialog.open(ConfirmationDialog,{
      data:{
        message: 'Are you surely want to delete?',
        buttonText: {
          ok: 'Ok',
          cancel: 'No'
        },
        
        uid:uid
      }
    });
    const snack = this.snackBar;

    dialogRef.afterClosed().subscribe((data) => {
      if (data.confirmed) {
        snack.dismiss();
        this.DelProj(data.id);
        const a = document.createElement('a');
        a.click();
        a.remove();
        snack.dismiss();
      }
    });
  }


updateproject(post){
  this.proj_id=post.proj_id;
  this.proj_name=post.proj_name;
  this.shortform=post.shortform;
  this.ProjectService.update_project(this.proj_id,this.client.value,this.proj_name,this.shortform,this.usertoken).subscribe(project_detail=>{
    if(project_detail.req_status =='1'){
     this.snackBar.open('Project Updated Sucessfully', 'close', {
       duration: 2000,
       verticalPosition: 'top'
     });
     this.getproject_info();
    }
    else{
     this.error=true;
     this.error_message = project_detail.message ;
   }
  this.ProjectService.setLoggedin(false);

},
error=>{
  this.error=!this.error;
  this.error_message="project Not Updated";
  console.log(this.error_message);
}
);
 }
}
interface project_detail{
proj_id:number;
name:string;
slug:string;
client_id:number;
shortform:string;
}
interface clients{
  client:string,
  id:number
}