import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatSnackBar,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition,VERSION, MatDialogRef, MatDialog,  MAT_DIALOG_DATA} from '@angular/material';
import { AdminService } from '../../../../services/admin.service';
import { Title } from '@angular/platform-browser';

// import { MustMatch } from '../../../../_helpers/must-match.validator';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.styl']
})
export class ResetPasswordComponent implements OnInit {
  resetpassForm: FormGroup;
  post:any;
  usertoken:string;
  error:boolean=false;
  titleAlert:string = 'This field is required';
  error_message="";
  oldpassword:any;
  confirmpassword:any;
  constructor( 
    private formBuilder:FormBuilder, 
    private AdminService:AdminService,
    public snackBar: MatSnackBar,
    private titleService: Title
    ) 
    { 
      this.usertoken = localStorage.getItem('auth-key');
    }

  ngOnInit() {
    this.titleService.setTitle("CDE - Reset Password");
    this.resetpassForm=this.formBuilder.group({
      "oldpassword":[null, Validators.required],
      "newpassword":[null, Validators.required],
      "confirmpassword":[null, Validators.required]
    },{
      validator: this.MustMatchs('newpassword', 'confirmpassword')
    });
  }
  MustMatchs(newpassword: any, confirmpassword: any) {
    return (group: FormGroup): {[key: string]: any} => {
       let f = group.controls[newpassword];
      let t = group.controls[confirmpassword];

      if (f.value !== t.value) {
        console.log(f.value !== t.value);
        return {
          dates: 'Passwords must match'
        
        };
      }
      return {};
    }
  }
  reset_pass(post){
    console.log("sdfdsf");
    this.oldpassword=post.oldpassword;
    this.confirmpassword=post.confirmpassword;
    this.AdminService.reset_password(this.oldpassword,this.confirmpassword,this.usertoken).subscribe(pass=>{
          this.snackBar.open(pass.message, 'close', {
        duration: 2000,
        verticalPosition: 'top'
      });
      this.resetpassForm.reset();
  },
  error=>{
    this.error=!this.error;
    this.error_message="Comment Not Added";
  },
  );
  }
  

}
