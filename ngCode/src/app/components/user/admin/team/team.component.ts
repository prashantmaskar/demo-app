import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import {MatSnackBar,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition,VERSION, MatDialogRef, MatDialog,  MAT_DIALOG_DATA} from '@angular/material';
import{FormBuilder,FormGroup, FormControl, Validators} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import {ConfirmationDialog} from '../confirm-dialog/confirmation-dialog.component';
import {AdminService} from '../../../../services/admin.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.styl']
})
export class TeamComponent implements OnInit {
display='none';
display1='none';
display_msg="none";
 show:boolean = false;
 teamForm:FormGroup;
 editteamForm:FormGroup;
 teammembername:string;
 membereamil:string;
 mainrole:number;
 utype:number;
 teammemberlname:string;
 usertoken:string;
 post:any;
 error:boolean=false;
 error_message="";
 teammembrs:teammembrs[];
 teammembr:teammembr[];
 selcolumnid:number;
 seltypeid:number;
 user_id:number;
 designations:designations[];
 roles:roles[];
 user_role:any;
 @ViewChild('focusauto') private focusauto: ElementRef;
 titleAlert: string = 'This Field is Required';
  constructor(
    private formBuilder:FormBuilder,
    private AdminService:AdminService,
    public snackBar: MatSnackBar,
    private dialog: MatDialog, 
    private titleService: Title
     ) {
    this.teammembername="";
    this.membereamil="";
    this.mainrole=0;
    this.utype=0;
    this.teammemberlname="";
    this.teamForm=formBuilder.group({
      "teammembername":[null, Validators.required],
      "membereamil":[null,Validators.required],
      "mainrole":[null,Validators.required],
      "utype":[null,Validators.required],
      "teammemberlname":[null,Validators.required]

    });
    this.editteamForm = this.formBuilder.group({
      "teammembername":[null, Validators.required],
      "membereamil":[null,Validators.required],
      "mainrole":[null,Validators.required],
      "utype":[null,Validators.required],
      "teammemberlname":[null,Validators.required],
      "user_id":['0',Validators.required]
    });
    this.get_team_list();
    this.get_designation_list();
    this.get_role_list();

    this.user_role = localStorage.getItem('user_role');
   }

  ngOnInit() {
    this.titleService.setTitle("CDE - Team Member");
    
  }
  ngAfterViewInit(){
    this.focusauto.nativeElement.focus();

  }
  
  openteam(){
    this.display="block"; 
    setTimeout(() => {this.focusauto.nativeElement.focus();});
  }
  onCloseHandled(){
    this.display='none'; 
    this.display1='none'; 
    this.teamForm.reset();

 }
 get_designation_list(){
  this.AdminService.get_designation_list().subscribe((desg_list:designations[])=>{
     this.designations =desg_list;
 
   });
  }
  get_role_list(){
    this.AdminService.get_role_list().subscribe((role_list:roles[])=>{
       this.roles =role_list;
   
     });
    }
 add_team(post){
  this.teammembername=post.teammembername;
  this.teammemberlname=post.teammemberlname;
  this.membereamil=post.membereamil;
  this.mainrole = post.mainrole; 
  this.utype = post.utype; 
  this.usertoken = localStorage.getItem('auth-key');
  this.AdminService.add_teammember(this.teammembername,this.teammemberlname,this.membereamil,this.mainrole,this.utype,this.usertoken,).subscribe(teammember=>{
          
     if(teammember.req_status=='1'){
      this.snackBar.open('Team Member Added Sucessfully', 'close', {
        duration: 2000,
        verticalPosition: 'top'
      });
      this.display='none'; 
      this.teamForm.reset();
      this.get_team_list();
     }
     else{
      this.snackBar.open('Team Member Already Exists', 'close', {
        duration: 2000,
        verticalPosition: 'top'
      });
      this.display='none'; 
      this.teamForm.reset();
       this.error=true;
       this.error_message = teammember.message ;
     }
    

  },
  error=>{
    this.error=!this.error;
    this.error_message="member Not Added";
    console.log(this.error_message);
  }
);
 }
 get_team_list(){
  this.AdminService.get_team_list().subscribe((team_list:teammembrs[])=>{
     this.teammembrs =team_list;
 
   });
   }
  onEdit(uid:number){
    this.AdminService.edit_member(uid).subscribe(member_details=>{
      this.teammembr =member_details;
      this.editteamForm = this.formBuilder.group({
        "teammembername":[member_details.first_name, Validators.required],
        "membereamil":[member_details.email,Validators.required],
        "teammemberlname":[member_details.last_name,Validators.required],
        "mainrole":[member_details.designation,Validators.required],
        "utype":[member_details.role,Validators.required],
        "user_id":[member_details.uid,Validators.required]
      });
      this.selcolumnid = member_details.designation;
      this.seltypeid = member_details.role;
      });

      this.display1="block";
      setTimeout(() => {this.focusauto.nativeElement.focus();});
  }
  update_team(post){
    this.teammembername=post.teammembername;
    this.teammemberlname=post.teammemberlname;
    this.membereamil=post.membereamil;
    this.mainrole = post.mainrole; 
    this.utype = post.utype;
    this.user_id = post.user_id;
    this.usertoken = localStorage.getItem('auth-key');
    this.AdminService.update_teammember(this.teammembername,this.teammemberlname,this.mainrole,this.utype,this.user_id,).subscribe(teammember=>{
            
       if(teammember.req_status=='1'){
        this.display_msg="block"; 
        this.display='none'; 
        this.display1='none'; 
        this.editteamForm.reset();
        this.snackBar.open('Member Updated Sucessfully', 'close', {
          duration: 2000,
          verticalPosition: 'top'
        });
        this.get_team_list();
       }
       else{
         this.error=true;
         this.error_message = teammember.message ;
       }
      
  
    },
    error=>{
      this.error=!this.error;
      this.error_message="member Not Added";
      console.log(this.error_message);
    }
  );
  }
   onDelete(index: number,uid:number){
    this.AdminService.del_member(uid).subscribe(del_id_res=>{
    if(del_id_res.req_status == '1'){
      this.snackBar.open('Member Deleted Sucessfully', 'close', {
        duration: 2000,
        verticalPosition: 'top'
      });
      this.get_team_list();
    }
    });
  }


  openDialog(i,uid) {

    const dialogRef = this.dialog.open(ConfirmationDialog,{
      data:{
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        },
        uindex:i,
        uid:uid
      }
    });
    const snack = this.snackBar;

    dialogRef.afterClosed().subscribe((data) => {
      console.log(data);
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
interface teammembrs{
  email:string,
  uid:number,
  first_name:string;
  last_name:string;
  designation:number;
  role:number;
}
interface teammembr{
  email:string,
  uid:number,
  teammembername:string;
  last_name:string;
  designation:number;
  role:number;
}
interface designations{
  designation:string,
  id:number
}
interface roles{
  role:string,
  id:number
}