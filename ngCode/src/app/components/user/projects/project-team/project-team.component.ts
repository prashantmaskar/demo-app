import { Component, OnInit,ViewChild } from '@angular/core';
import {FormBuilder,FormGroup, FormControl, Validators} from '@angular/forms';
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import {AdminService} from '../../../../services/admin.service';
import {ProjectService} from '../../../../services/project.service';
import {MatSnackBar,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition,MatDialog} from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {ConfirmationDialog} from '../../admin/confirm-dialog/confirmation-dialog.component';
import { of, zip } from 'rxjs';
import { MatSort,MatPaginator, MatTableDataSource } from '@angular/material';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-project-team',
  templateUrl: './project-team.component.html',
  styleUrls: ['./project-team.component.styl']
})


export class ProjectTeamComponent implements OnInit {
  post:any;
  teamaddForm:FormGroup;
  public member: FormControl = new FormControl('', Validators.required);
  teammembrs:teammembrs[];
  nteammembrs:nteammembrs[];
  usertoken:string;
  p_id:number;
  show:boolean = false;
  user_role:string;
  user_type:string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  dataSource = new MatTableDataSource<teammembrs>();
  displayedColumns = ['Id', 'First Name', 'Last Name','Designation','Team Lead','Action'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  setdisable:boolean;
  constructor(private AdminService:AdminService,private ProjectService:ProjectService,private route: ActivatedRoute,private formBuilder:FormBuilder,public snackBar: MatSnackBar,private dialog: MatDialog,private titleService: Title) {
    this.route.parent.params.subscribe( params => 
     
      this.p_id =params['project_id']
      );
    
    this.teamaddForm=formBuilder.group({
     
      "member":['',Validators.required]
    });
  

    this.get_pteam_list();
    this.get_nteam_list();
    this.user_role = localStorage.getItem('user_role');
    if(this.user_role == '1'){
   this.show = this.show;
    }
    else{
     this.show= !this.show;
    }
   }

  ngOnInit() {
    this.titleService.setTitle("CDE - Project Team");
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  

  get_pteam_list(){
    this.usertoken = localStorage.getItem('auth-key');
    this.ProjectService.get_pteam_list(this.p_id,this.usertoken,).subscribe((pteam_list:teammembrs[])=>{
       this.teammembrs =pteam_list;
       this.dataSource.data = pteam_list;
       this.dataSource.sort = this.sort;
       
     });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  get_nteam_list(){
    this.usertoken = localStorage.getItem('auth-key');
    
    this.ProjectService.get_nteam_list(this.p_id,this.usertoken,).subscribe((nteam_list:nteammembrs[])=>{
      this.nteammembrs =nteam_list;
      this.get_pteam_list();
    });

  }
  adteammem(){
    
    this.usertoken = localStorage.getItem('auth-key');
    this.ProjectService.add_mem_tem(this.p_id,this.member.value,this.usertoken,).subscribe(nteam_list=>{
      if(nteam_list.req_status == '1'){
      this.snackBar.open('Member Successfully Added To The Team.', 'close', {
        duration: 2000,
        verticalPosition: 'top'
      });
      this.member.reset();
      this.get_pteam_list();
      this.get_nteam_list();
    }
  
  
  
    });

  }
  addlead(event,index,user_id){
  if(event.checked==true){
    this.user_type = '1';
  }
  else{
    this.user_type = '0';
  }
    this.ProjectService.fn_update_user_project_role(this.p_id,this.usertoken,user_id,this.user_type).subscribe(lead_info=>{
      if(lead_info.req_status == '1'){
        this.teammembrs.splice(index, 1);
        this.snackBar.open('Member Role Updated Successfully', 'close', {
          duration: 2000,
          verticalPosition: 'top'
        });
      
      }
    });
  } 
  onDelete(index: number,id:number){
    this.usertoken = localStorage.getItem('auth-key');
    this.ProjectService.del_tmember(this.p_id,id,this.usertoken,).subscribe(del_id_res=>{
      if(del_id_res.req_status == '1'){
        this.teammembrs.splice(index, 1);
        this.snackBar.open('Member Successfully Removed From The Team.', 'close', {
          duration: 2000,
          verticalPosition: 'top'
        });
        this.get_pteam_list();
        this.get_nteam_list();
      }
      });
  }
  openDialog(i,uid) {

    const dialogRef = this.dialog.open(ConfirmationDialog,{
      data:{
        message: 'Are you surely want to delete?',
        buttonText: {
          ok: 'Ok',
          cancel: 'No'
        },
        uindex:i,
        uid:uid
      }
    });
    const snack = this.snackBar;

    dialogRef.afterClosed().subscribe((data) => {
      if (data.confirmed) {
        snack.dismiss();
        this.onDelete(data.index,data.id);
        const a = document.createElement('a');
        a.click();
        a.remove();
        snack.dismiss();
      }
    });
  }

     
}

export interface nteammembrs{
  email:string,
  uid:number,
  first_name:string;
}
export interface teammembrs{
  email:string,
  id:number,
  first_name:string;
}