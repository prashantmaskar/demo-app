import { Component, OnInit ,Input, HostListener, ElementRef } from '@angular/core';
import{FormBuilder,FormGroup, FormControl, Validators} from '@angular/forms';
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import {HttpClient, HttpParams, HttpRequest, HttpEvent,HttpEventType,HttpResponse} from '@angular/common/http';
import {Observable} from "rxjs";

import {ProjectService} from '../../../services/project.service';
import { AdminService } from '../../../services/admin.service';
@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.styl']
})
export class UserHeaderComponent implements OnInit {
  show:boolean = false;
  shownav:boolean = false;
  open:boolean = false;
  corner:boolean =false;
  display='none';
  displaytask='none';
  usertoken:string;
  projectForm:FormGroup;
  user_role:string;
  user_name:string;
  projectname:string;
  clientname:number;
  taskname:string;
  post:any;
  error:boolean=false;
  titleAlert:string = 'This Field is Required';
  error_message="";
  p_id:number;
  projects:projects[];
  teammembrs:teammembrs[];
  clients:clients[];
  percentDone: number;
  uploadSuccess: boolean;
  taskdesc = new FormControl('');
  tasksdate = new FormControl('');
  taskedate =new FormControl('');
  isOpen: boolean = false;
  constructor(private formBuilder:FormBuilder,private ProjectService:ProjectService, private AdminService:AdminService,private route: ActivatedRoute,private router: Router,private elementRef: ElementRef) {
    this.projectname="";
    this.clientname=0;
    this.taskname="";
  this.projectForm=formBuilder.group({
    "projectname":[null, Validators.required],
    "clientname":[null,Validators.required]
  });
   this.user_role = localStorage.getItem('user_role');
   this.user_name = localStorage.getItem('user_name');
 if(this.user_role == '1'){
this.shownav = this.shownav;
 }
 else{
  this.shownav = !this.shownav;
 }
 this.get_client_list();
   }

  ngOnInit() {

    
  }
  @HostListener('document:click', ['$event', '$event.target'])
  onClick(event: MouseEvent, targetElement: HTMLElement) {
    if (!targetElement) {
       return;
    }

    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
        this.isOpen = false;
    }
  }
  togglemenu(){
    
    this.open = !this.open;
  }
  toggleCollapse() {
    this.show = !this.show;
    this.corner = !this.corner;
  }
  openproject(){
    this.display="block"; 
    this.projectForm.reset();
    this.show = !this.show;
    this.corner = !this.corner;
  }
  onCloseHandled(){
    this.display='none'; 
    this.projectForm.reset();

 }

 logout(){
  localStorage.removeItem("auth-key");
  localStorage.clear();
  this.router.navigate([""]);
}

opentask(){
  this.displaytask="block"; 
  
  this.show = !this.show;
  this.corner = !this.corner;
  this.get_project_list();
}
onCloseHandledtask(){
  this.displaytask='none'; 
  this.projectForm.reset();

}

get_project_list(){
  this.usertoken = localStorage.getItem('auth-key');
  this.ProjectService.get_project_list(this.usertoken).subscribe(projects=>{
    this.projects = projects;

  });
}
ngOnDestroy(){
 
}
get_client_list(){
  this.AdminService.get_client_list().subscribe((clinet_list:clients[])=>{
    this.clients=clinet_list;
  });
}

}
interface projects{
  name:string,
  c_name:string,
  proj_id:number
}
export interface teammembrs{
  email:string,
  id:number,
  first_name:string;
}
interface clients{
  c_name:string,
  id:number
}