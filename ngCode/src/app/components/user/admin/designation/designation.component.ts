import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  VERSION,
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA
} from "@angular/material";
import { ConfirmationDialog } from "../confirm-dialog/confirmation-dialog.component";
import { Title } from '@angular/platform-browser';
import { AdminService } from "../../../../services/admin.service";
@Component({
  selector: "app-designation",
  templateUrl: "./designation.component.html",
  styleUrls: ["./designation.component.styl"]
})
export class DesignationComponent implements OnInit {
  display = "none";
  designForm: FormGroup;
  post: any;
  designation: string;
  desig_id: number;
  usertoken: string;
  error: boolean = false;
  titleAlert: string = "This Field is Required";
  error_message = "";
  designations: designations[];
  user_role: any;
  @ViewChild("buttontxt") buttontxt: ElementRef;
  @ViewChild('focusauto') private focusauto: ElementRef;
  constructor(
    private formBuilder: FormBuilder,
    private AdminService: AdminService,
    public snackBar: MatSnackBar,
    private dialog: MatDialog,
    private titleService: Title
  ) {
    this.designForm = formBuilder.group({
      designation: [null, Validators.required],
      desig_id: ["0", Validators.required]
    });
    this.get_designation_list();
    this.user_role = localStorage.getItem("user_role");
  }

  ngOnInit() {
    this.titleService.setTitle("CDE - Associates Role");
  }

  add_designation(post) {
    this.designation = post.designation;
    this.desig_id = post.desig_id;
    this.usertoken = localStorage.getItem("auth-key");
    if (post.desig_id == 0) {
      this.AdminService.add_designation(
        this.designation,
        this.usertoken
      ).subscribe(
        designation => {
          console.log(designation);

          if (designation.req_status == "1") {
            this.snackBar.open('Role Added Sucessfully', 'close', {
              duration: 2000,
              verticalPosition: 'top'
            });
            this.get_designation_list();
            this.designForm.reset();
            this.designForm = this.formBuilder.group({
              designation: [null, Validators.required],
              desig_id: ["0", Validators.required]
            });
            this.onCloseHandled();
          } else {
            this.error = true;
            this.error_message = designation.message;
          }
          this.AdminService.setLoggedin(false);
          //this.loginService.setIndex(this.users.username);
          /*if(this.users.type=="student"){
         this.router.navigate(["user/profile"]);
       }else if(this.users.type=="Admin"){
         this.router.navigate(["admin/home"]);
       }else if(this.users.type=="Employee"){
         this.router.navigate(["employee"]);
       }*/
        },
        error => {
          this.error = !this.error;
          this.error_message = "Role Not Added";
          console.log(this.error_message);
        }
      );
    } else {
      this.AdminService.update_designation_details(
        this.designation,
        this.desig_id
      ).subscribe(
        designation => {
          this.buttontxt.nativeElement.innerText = "Save";

          if (designation.req_status == "1") {
            this.snackBar.open('Role Updated Sucessfully', 'close', {
              duration: 2000,
              verticalPosition: 'top'
            });
            this.get_designation_list();
            this.designForm.reset();
            this.designForm = this.formBuilder.group({
              designation: [null, Validators.required],
              desig_id: ["0", Validators.required]
            });
            this.onCloseHandled();
          } else {
            this.error = true;
            this.error_message = designation.message;
          }
          this.AdminService.setLoggedin(false);
          //this.loginService.setIndex(this.users.username);
          /*if(this.users.type=="student"){
         this.router.navigate(["user/profile"]);
       }else if(this.users.type=="Admin"){
         this.router.navigate(["admin/home"]);
       }else if(this.users.type=="Employee"){
         this.router.navigate(["employee"]);
       }*/
        },
        error => {
          this.error = !this.error;
          this.error_message = "Role Not Added";
          console.log(this.error_message);
        }
      );
    }
  }

  get_designation_list() {
    this.AdminService.get_designation_list().subscribe(
      (desg_list: designations[]) => {
        this.designations = desg_list;
      }
    );
  }
  openteam(){
    this.designForm.reset();
    this.designForm = this.formBuilder.group({
      designation: [null, Validators.required],
      desig_id: ["0", Validators.required]
    });
    this.display = "block";  
    this.buttontxt.nativeElement.innerText = "Save";
    setTimeout(() => {this.focusauto.nativeElement.focus();});
  }
  onEdit(desg_id) {
    this.AdminService.edit_designation(desg_id).subscribe(desig_res => {
      this.designForm = this.formBuilder.group({
        designation: [desig_res.designation, Validators.required],
        desig_id: [desig_res.id, Validators.required]
      });
      this.buttontxt.nativeElement.innerText = "Update";
    });
    this.display = "block";
    setTimeout(() => {this.focusauto.nativeElement.focus();});
  }
  onCloseHandled() {
    this.display = "none";
  }

  onDelete(index: number, id: number) {
    this.AdminService.del_designation(id).subscribe(del_id_res => {
      if (del_id_res.req_status == "1") {
        this.snackBar.open("Role Deleted Sucessfully", "close", {
          duration: 2000,
          verticalPosition: "top"
        });
        this.get_designation_list();
      }
    });
  }

  openDialog(i, uid) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        message: "Are you sure want to delete?",
        buttonText: {
          ok: "Ok",
          cancel: "No"
        },
        uindex: i,
        uid: uid
      }
    });
    const snack = this.snackBar;

    dialogRef.afterClosed().subscribe(data => {
      if (data.confirmed) {
        snack.dismiss();
        this.onDelete(data.index, data.id);
        const a = document.createElement("a");
        a.click();
        a.remove();
        snack.dismiss();
      }
    });
  }
}
interface designations {
  designation: string;
  id: number;
}
